type IgnoredKeys = Array<string>;

type Options = {
  prefix?: string;
  separator?: string;
  ignoreKeys?: IgnoredKeys;
};

type RecursiveRecord = {
  [key: string]: RecursiveRecord;
};

export declare const REACT_IGNORED_KEYS: IgnoredKeys;

export function createId<T = RecursiveRecord>(options?: Options): T;

export function createIdFromScheme<T = RecursiveRecord>(scheme: T, options?: Options): T;
