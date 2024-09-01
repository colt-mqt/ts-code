
// 函数中的类型
// 函数的声明方式、函数的参数、函数的返回值

// function 关键字声明的函数可以提升到当前作用域顶部
// 对于 ts 来说：
// + 函数关键字声明的函数，不能标注函数类型
// + 表达式声明的函数，必须赋予的值要满足定义的类型
// function sum(a, b) {
//   return a + b
// }

// 1. 函数类型的定义 (a: any, b: any) => any ｜ {(a: any, b: any): any}
// const sum:(a: any, b: any) => any = function(a:string, b) {
//   return a + b
// }
type ISum = {(a: any, b: any): any}
const sum:ISum = function(a:string, b:string) {
  return a + b
}
sum(1, 2)
// + 如果标明函数的类型，在使用函数的时候以标明的为准（ISum为准）

// 2. 参数 可选参数
// + 可选参数 ? 1）意味着可不传和 必须得传 string ｜ undefined；2）只能在参数列表中的后面
const sum2 = function(a:string, b?:string) {
  return a + b
}
sum2('1', undefined)
// + 参数this问题
// 尽量不采用 this 作为函数的上下文，this 的缺陷就是类型推导问题
// 如果想限制 this 类型， 需要手动指定，且放在参数列表第一位，不是行参
function getValue(this: { name: string, age: number }, key) {
  return this[key];
}
const person = { name: 'jj', age: '100' }
// getValue.call(person, 'name')

// + typeof 根据值来获得类型 配合 type 来声明新的类型
type IPerson = typeof person
function getValue1(this: IPerson, key: IKeys) {
  return this[key];
}
// + keyof 可以获取对象中的类型，作为联合类型
type IKeys = keyof IPerson
getValue1.call(person, 'xxx')


// 函数中的 arguments 不建议使用
// 函数式编程 入参一定，返回值一定
// 组合式 api 可以没有入参
function sum3(...args:number[]):number {
  return args.reduce((memo, current) => (memo += current) ,0)
}

// 函数的返回值在 {} 前面标识
const sum4:(...args:any[]) => any = (...args:any[]): any => {
  return 1
}

// 3. ts 中函数有一个概念 重载
// 对于强类型语言可以一个函数写多遍（参数不同）
// js 实现靠的是 arguments


function toArray(value:string):string[] // 具体的某一种方案
function toArray(value:number):number[]
// 上面的声明仅仅是类型上的重载
function toArray(value:string | number):string[] | number[] { // 所有的实现
  return []
}
let arr1 = toArray('abc')
let arr2 = toArray(123)


export {}