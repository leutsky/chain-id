type KeysBlacklist = Array<string>;

type Options = {
  prefix?: string;
  separator?: string;
  keysBlacklist?: KeysBlacklist;
};

type RecursiveRecord = {
  [key: string]: RecursiveRecord;
};

export declare const REACT_KEYS_BLACKLIST: KeysBlacklist;

export function createId<T = RecursiveRecord>(options?: Options): T;

export function createIdFromScheme<T = RecursiveRecord>(scheme: T, options?: Options): T;
