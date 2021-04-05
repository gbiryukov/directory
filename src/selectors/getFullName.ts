type Name = {
  title?: string;
  first?: string;
  last?: string;
};

const EMPTY_NAME = '–';

export function getFullName(name?: Name): string {
  if (!name) {
    return EMPTY_NAME;
  }

  return [name.title, name.first, name.last].filter(Boolean).join(' ') || EMPTY_NAME;
}
