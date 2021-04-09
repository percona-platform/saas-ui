export const slugify = (text: string): string => text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
