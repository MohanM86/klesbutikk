export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function deslugify(slug: string): string {
  return slug
    .replace(/aa/g, 'å')
    .replace(/oe/g, 'ø')
    .replace(/ae/g, 'æ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
