
// 内置类型中有 基于对象类型的
interface Person1 {
  handsome: string
}
interface Person2 {
  high: string
}

// for(let key in Object.keys(T))
type Compute<T> = {
  [xx in keyof T]: T[xx]
}
type Person3 = Compute<Person1 & Person2>

// partial required pick omit...
interface IPerson {
  name: string,
  age: number
}
interface ICompany {
  name: string,
  age: number,
  address: string,
  person: IPerson
}
// partial 让所有的key可选
// 相当于 type Partial<T> = { [xx in keyof T]?: T[xx] }
type PartialRes = Partial<ICompany>
let company: PartialRes = {
  // person: {} // 如果有 person 属性则 person 里必须有 name 和 age
}

// 实现深度可选
type DeepPartial<T> = {
  // 递归
  [key in keyof T]?: T[key] extends object ? DeepPartial<T[key]> : T[key]
}
type PartialRes1 = DeepPartial<ICompany>
let company1: PartialRes1 = {
  person: {}
}

// required
// 相当于 type Required <T> = { [key in keyof T]-?: T[key] }
interface IPer {
  name?: string,
  age?: number
}
interface ICom {
  name: string,
  age: number,
  address: string,
  person: IPer
}
type Res1 = Required<ICom>

// 实现深度必填
type DeepRequired<T> = {
  // 递归
  [key in keyof T]-?: T[key] extends object ? DeepRequired<T[key]> : T[key]
}
type Res2 = DeepRequired<ICom>
let company3: Res1 = {
  name: 'a',
  age: 15,
  address: 'str',
  person: {}
}