function formatter<T>(formatFn: (str: string) => T): (str: string) => T {
  return function inner(str) {
    return formatFn(str);
  };
}

export const lower = formatter((str) => str.toLowerCase());

export const upper = formatter((str) => str.toUpperCase());

export const upperFirst = formatter(
  (str) => upper(str[0]) + lower(str.substring(1))
);

export const startCase = formatter((str) =>
  str.split(' ').map(upperFirst).join(' ')
);

export const snakeCase = formatter((str) =>
  str.split(' ').map(lower).join('-')
);

export const removeWhitespace = formatter((str) =>
  str.replace(/\s+/g, ' ').trim()
);
