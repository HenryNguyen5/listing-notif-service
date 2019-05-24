export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer V>
    ? ReadonlyArray<DeepPartial<V>>
    : DeepPartial<T[P]>
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends Function
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<DeepRequired<U>>
    : T[P] extends ReadonlyArray<infer V>
    ? ReadonlyArray<DeepRequired<V>>
    : DeepRequired<T[P]>
};
