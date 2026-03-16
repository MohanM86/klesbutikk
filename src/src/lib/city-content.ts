interface CityContent {
  intro: string;
  shoppingInfo: string;
  faqs: { question: string; answer: string }[];
}

const cityContentMap: Record<string, CityContent> = {
  Oslo: {
    intro: `Oslo er Norges motehovedstad og hjem til landets største utvalg av klesbutikker. Fra eksklusive designerbutikker på Aker Brygge og Karl Johan til unike vintagebutikker i Grünerløkka og Torshov – Oslo har noe for enhver smak og ethvert budsjett. Byen er kjent for sin skandinaviske minimalisme blandet med internasjonale trender, og tiltrekker seg både norske og internasjonale merker. Oslos shopping-scene er i stadig utvikling, med nye konseptbutikker og moteopplevelser som åpner jevnlig. Enten du er på jakt etter high fashion, streetwear, bærekraftige merker eller klassiske norske design, finner du det i Oslo.`,
    shoppingInfo: `De mest populære shoppingområdene i Oslo inkluderer Karl Johans gate, Bogstadveien, Majorstuen, Grünerløkka, Aker Brygge og Oslo City. For luksusmerker anbefales Eger og Steen & Strøm. Grünerløkka er kjent for vintage og uavhengige butikker, mens Majorstuen tilbyr en blanding av kjeder og nisjebutikker.`,
    faqs: [
      { question: 'Hva er de beste klesbutikkene i Oslo?', answer: 'Oslo har et bredt utvalg av klesbutikker, fra eksklusive designerbutikker på Aker Brygge til trendy konseptbutikker på Grünerløkka. Populære områder inkluderer Karl Johan, Bogstadveien og Majorstuen.' },
      { question: 'Hvor finner jeg designerklær i Oslo?', answer: 'For designerklær i Oslo kan du besøke butikker langs Bogstadveien, Aker Brygge, og kjøpesentre som Eger og Steen & Strøm. Her finner du både norske og internasjonale luksusmerker.' },
      { question: 'Finnes det vintagebutikker i Oslo?', answer: 'Ja, Oslo har mange vintagebutikker, spesielt i Grünerløkka-området. Her finner du kuraterte secondhand-butikker med unike funn fra forskjellige tiår.' },
    ],
  },
  Bergen: {
    intro: `Bergen, Vestlandets hovedstad, tilbyr en sjarmerende blanding av tradisjonell norsk mote og moderne trender. Med sitt historiske bybilde og levende kulturscene er Bergen et spennende sted for shopping. Bryggen-området og sentrum byr på alt fra lokale designere til internasjonale kjeder. Bergens motescene er preget av en avslappet, men sofistikert stil som gjenspeiler byens karakter. Her finner du butikker som selger alt fra regntøy med stil til elegante hverdagsklær.`,
    shoppingInfo: `De beste shoppingområdene i Bergen inkluderer Galleriet, Xhibition, Torgallmenningen, Strandgaten og Bryggen. Bergen har også flere unike nisjebutikker i Skostredet og Nøstet-området.`,
    faqs: [
      { question: 'Hvor handler man klær i Bergen?', answer: 'Bergen har flere gode shoppingområder, inkludert Galleriet, Xhibition, Torgallmenningen og Strandgaten. Du finner alt fra store kjeder til lokale designerbutikker.' },
      { question: 'Hva er de beste klesbutikkene i Bergen?', answer: 'Bergen har mange gode klesbutikker spredt over sentrum, med populære områder rundt Torgallmenningen og Galleriet. Byen er spesielt kjent for skandinaviske merker og lokale designere.' },
    ],
  },
  Trondheim: {
    intro: `Trondheim, Norges teknologihovedstad, har en overraskende rik motescene med et variert utvalg klesbutikker. Nordre gate og Munkegata er hjertet av shopping i Trondheim, med alt fra store kjeder til sjarmerende lokale butikker. Studentbyen bringer frisk energi til motescenen, og du finner mange trendy butikker som appellerer til et ungt og motebevisst publikum. Trondheim er også kjent for sine unike nisjebutikker og konseptbutikker.`,
    shoppingInfo: `Populære shoppingområder i Trondheim inkluderer Nordre gate, Munkegata, City Lade, Trondheim Torg og Solsiden. Bakklandet byr på sjarmerende småbutikker med unik karakter.`,
    faqs: [
      { question: 'Hvor finner jeg klesbutikker i Trondheim?', answer: 'De fleste klesbutikkene i Trondheim ligger i sentrum, spesielt langs Nordre gate og rundt Trondheim Torg. City Lade og Solsiden er også populære shoppingdestinasjoner.' },
      { question: 'Hva er de beste shoppingområdene i Trondheim?', answer: 'Nordre gate er Trondheims viktigste handlegate med et bredt utvalg butikker. Solsiden og City Lade tilbyr også gode shoppingmuligheter.' },
    ],
  },
  Stavanger: {
    intro: `Stavanger er en dynamisk by med en mangfoldig shopping-scene. Byen kombinerer oljebyen-energi med skandinavisk design, og tilbyr alt fra internasjonale luksusmerker til lokale norske designere. Fargerike trehus og moderne arkitektur danner bakteppet for en unik shoppingopplevelse. Stavanger sentrum er kompakt og lett å utforske til fots, med mange butikker samlet i gangavstand.`,
    shoppingInfo: `Sentrum av Stavanger har de fleste klesbutikkene, med populære områder rundt Klubbgata, Kirkegata og Stavanger Storsenter. Forus og Madla har også store kjøpesentre.`,
    faqs: [
      { question: 'Hva er de beste klesbutikkene i Stavanger?', answer: 'Stavanger sentrum har et godt utvalg klesbutikker langs Klubbgata og Kirkegata. For et større utvalg kan du besøke Stavanger Storsenter eller kjøpesentre på Forus.' },
    ],
  },
};

export function getCityContent(cityName: string): CityContent {
  if (cityContentMap[cityName]) return cityContentMap[cityName];

  // Generate generic content for other cities
  return {
    intro: `${cityName} tilbyr et variert utvalg av klesbutikker for alle stiler og budsjetter. Enten du er på jakt etter hverdagsklær, festantrekk eller sportsutstyr, finner du det i ${cityName}. Byen har både velkjente kjeder og lokale favorittbutikker som gir deg en unik shoppingopplevelse. Utforsk klesbutikkene i ${cityName} og oppdag lokale moteperler.`,
    shoppingInfo: `${cityName} har flere gode shoppingmuligheter med klesbutikker i sentrum og på lokale kjøpesentre. Her finner du alt fra store kjeder til sjarmerende nisjebutikker.`,
    faqs: [
      { question: `Hvor finner jeg klesbutikker i ${cityName}?`, answer: `${cityName} har flere klesbutikker i sentrum og på lokale kjøpesentre. Bruk vår oversikt for å finne de beste butikkene nær deg.` },
      { question: `Hva er de beste klesbutikkene i ${cityName}?`, answer: `Se vår komplette liste over klesbutikker i ${cityName} for å finne de best vurderte butikkene i området.` },
    ],
  };
}
