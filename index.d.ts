export interface jeckOptions {
  orderTolerant?: boolean;
  debug?: boolean;
}

export default function jeck(
  a: string | number | boolean | null | Array<any> | object | undefined,
  b: string | number | boolean | null | Array<any> | object | undefined,
  options: jeckOptions
): boolean | null;
