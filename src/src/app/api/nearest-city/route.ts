import { NextResponse } from 'next/server';
import { getAllCities } from '@/lib/stores';
import { slugify } from '@/lib/slugify';

// Norwegian city coordinates (approximate centers)
// Covers all major cities and many smaller ones
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Oslo': { lat: 59.9139, lng: 10.7522 },
  'Bergen': { lat: 60.3913, lng: 5.3221 },
  'Trondheim': { lat: 63.4305, lng: 10.3951 },
  'Stavanger': { lat: 58.9700, lng: 5.7331 },
  'Kristiansand': { lat: 58.1599, lng: 8.0182 },
  'Drammen': { lat: 59.7441, lng: 10.2045 },
  'Fredrikstad': { lat: 59.2181, lng: 10.9298 },
  'Sandnes': { lat: 58.8524, lng: 5.7352 },
  'Tromsø': { lat: 69.6492, lng: 18.9553 },
  'Haugesund': { lat: 59.4138, lng: 5.2680 },
  'Tønsberg': { lat: 59.2675, lng: 10.4076 },
  'Sandefjord': { lat: 59.1314, lng: 10.2168 },
  'Ålesund': { lat: 62.4722, lng: 6.1495 },
  'Bodø': { lat: 67.2804, lng: 14.4049 },
  'Moss': { lat: 59.4332, lng: 10.6574 },
  'Sarpsborg': { lat: 59.2839, lng: 11.1094 },
  'Arendal': { lat: 58.4615, lng: 8.7726 },
  'Skien': { lat: 59.2098, lng: 9.6089 },
  'Hamar': { lat: 60.7945, lng: 11.0680 },
  'Larvik': { lat: 59.0530, lng: 10.0271 },
  'Lillehammer': { lat: 61.1153, lng: 10.4662 },
  'Molde': { lat: 62.7375, lng: 7.1591 },
  'Halden': { lat: 59.1226, lng: 11.3873 },
  'Kongsberg': { lat: 59.6729, lng: 9.6502 },
  'Horten': { lat: 59.4171, lng: 10.4849 },
  'Gjøvik': { lat: 60.7957, lng: 10.6916 },
  'Porsgrunn': { lat: 59.1408, lng: 9.6561 },
  'Harstad': { lat: 68.7982, lng: 16.5417 },
  'Hønefoss': { lat: 60.1685, lng: 10.2571 },
  'Asker': { lat: 59.8350, lng: 10.4357 },
  'Ski': { lat: 59.7190, lng: 10.8341 },
  'Sandvika': { lat: 59.8900, lng: 10.5264 },
  'Lillestrøm': { lat: 59.9560, lng: 11.0493 },
  'Jessheim': { lat: 60.1487, lng: 11.1747 },
  'Drøbak': { lat: 59.6583, lng: 10.6306 },
  'Mandal': { lat: 58.0297, lng: 7.4607 },
  'Grimstad': { lat: 58.3434, lng: 8.5936 },
  'Holmestrand': { lat: 59.4891, lng: 10.3135 },
  'Kragerø': { lat: 58.8696, lng: 9.4100 },
  'Kongsvinger': { lat: 60.1940, lng: 12.0029 },
  'Bryne': { lat: 58.7374, lng: 5.6496 },
  'Egersund': { lat: 58.4516, lng: 5.9990 },
  'Flekkefjord': { lat: 58.2966, lng: 6.6631 },
  'Førde': { lat: 61.4520, lng: 5.8570 },
  'Florø': { lat: 61.5998, lng: 5.0328 },
  'Voss': { lat: 60.6297, lng: 6.4118 },
  'Røros': { lat: 62.5748, lng: 11.3840 },
  'Stjørdal': { lat: 63.4692, lng: 10.9119 },
  'Namsos': { lat: 64.4663, lng: 11.4961 },
  'Mo I Rana': { lat: 66.3128, lng: 14.1427 },
  'Mosjøen': { lat: 65.8369, lng: 13.1914 },
  'Sortland': { lat: 68.6934, lng: 15.4141 },
  'Storslett': { lat: 69.7650, lng: 21.0297 },
  'Brumunddal': { lat: 60.8810, lng: 10.9434 },
  'Kristiansund N': { lat: 63.1107, lng: 7.7281 },
};

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'Mangler lat/lng' }, { status: 400 });
  }

  // Check if coordinates are roughly in Norway (lat 57-72, lng 4-32)
  if (lat < 57 || lat > 72 || lng < 3 || lng > 32) {
    return NextResponse.json({ city: null, reason: 'Utenfor Norge' });
  }

  const cities = getAllCities();

  // Find nearest city from our coordinate table
  let nearestName = '';
  let nearestDist = Infinity;

  for (const [name, coords] of Object.entries(CITY_COORDS)) {
    const dist = haversineDistance(lat, lng, coords.lat, coords.lng);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestName = name;
    }
  }

  // Max 50km distance, otherwise don't match
  if (nearestDist > 50 || !nearestName) {
    // Fallback: try to find any city within range
    return NextResponse.json({ city: null, reason: 'Ingen by funnet i nærheten' });
  }

  // Match to our city database
  const cityData = cities.find(
    (c) => c.name === nearestName || c.name.toLowerCase() === nearestName.toLowerCase()
  );

  if (!cityData) {
    return NextResponse.json({ city: null, reason: 'By ikke i databasen' });
  }

  return NextResponse.json({
    city: {
      name: cityData.name,
      slug: cityData.slug,
      fylke: cityData.fylke,
      storeCount: cityData.storeCount,
    },
    distance: Math.round(nearestDist),
  });
}
