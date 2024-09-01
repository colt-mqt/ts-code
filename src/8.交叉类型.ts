
// 联合类型（并集 => 按位或 ｜） 交叉类型（交集 = > 按位与 &）
interface Person1 {
  handsome: string
}

interface Person2 {
  high: string
}

let person1:Person1 | Person2 = {
  handsome: 's'
}

// 交叉类型 同时是两个类型的子类型，最终的结果可以赋予给任何一个类型
let person2: Person1 & Person2 = {
  handsome: 'shuai',
  high: 'gao'
}
// 最终的结果可以赋予给任何一个类型（子赋予父）
let p1: Person1 = person2
let p2: Person2 = person2

// -----------
interface Person3 {
  handsome: string,
  gender: number,
  meta: {
    n: number
  }
}

interface Person4 {
  high: string,
  gender: string,
  meta: {
    n: string
  }
}
type Person5 = Person3 & Person4
// 如果两个类型不相同没有交集 & 集后的结果是 never
type IGender1 = Person5['gender'] // never
type IGender2 = Person5['meta']['n'] // never



// 快速扩展属性
let obj = { name: 'ja', age: 24 }
let person: { name: string, age: number, address: string } = obj as typeof obj & { address: string }

function merge<T extends object, K extends object>(o1: T, o2: K) {
  return { ...o1, ...o2 }
}
let result = merge({ name: 'ab' }, { name: 123 })
// result.name => 是never类型

export { }