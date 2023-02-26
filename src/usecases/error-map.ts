
export type ErrorMap<T> = {
  [k in keyof T]: string
}