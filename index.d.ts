type Options = {
  prefix?: string;
  separator?: string;
};

type RecursiveRecord = {
  [key: string]: RecursiveRecord;
};

export function createId<T = RecursiveRecord>(options?: Options): T;
