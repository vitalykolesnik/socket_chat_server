import slugify from 'slugify';
import { v4 } from 'uuid';

export function generateSlug(title: string): string {
  return (
    slugify(title, {
      replacement: '-',
      lower: true,
      strict: true,
      trim: true,
    }) +
    '-' +
    v4()
  );
}
