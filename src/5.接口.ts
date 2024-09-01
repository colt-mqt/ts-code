// 接口：抽象类（有抽象也有非抽象） 接口必须都是抽象的（没有具体实现）
// 接口的概念：就是描述数据的结构、或者形状的，定义好结构，再去针对结构来实现

// type 和 interface 区别
// 一般情况下 描述对象、类，采用 interface 更多一些，interface 无法声明联合类型
// type 可以快速声明类型，联合类型、工具类型只能采用 type，type 不能重名
// type 用得更多，能用 type 就不用 inerface，复杂类型用 type


// 1) 接口可以描述对象结构
interface IPerson {
  username: string // 类型 不是具体实现
  age: number
}

// 子可以赋予给父，需要把一个值赋予另一个值，如果是声明必须一致
let obj = {
  username: 'abc',
  age: 20,
  address: 'dizhi'
}
// let person:IPerson = obj // 赋值的时候 会产生兼容性（子可以赋予给父，但是子取不出 address）

let person:IPerson = {
  username: 'abc',
  age: 20,
  // address: 'dizhi' // 报错 声明必须一致
}

// 2）接口可以描述函数
interface ICount {
  (): number
  count: number
}
// let 可以修改 const 标识不能修改（如果给函数增加类型定义 函数不能被修改时只能用 const）
// let counter: ICount = () => {
//   return counter.count++
// }
const counter: ICount = () => {
  return counter.count++
}
counter.count = 0


// 1）可通过 ？ 表示接口的属性可有可无
interface IVeg {
  readonly name: string, // 只读属性
  taste: string,
  size: number,
  // color?: string
}
const veg1:IVeg = {
  name: '西红柿',
  taste: '甜',
  size: 50
}

// 2）断言的方式来进行赋值 as IVeg
const veg2:IVeg = {
  name: '西红柿',
  taste: '甜',
  size: 50
} as IVeg

// 3）接口的合并 同名的会进行合并，自定义类型的时候会使用，自己的业务逻辑用的少（一般用于扩展源码）
interface IVeg {
  color?: string
}

// 4）可以扩展一个新类型再使用，可以扩展属性
interface IVegetable extends IVeg {
  color?: string,
  [key: string]: any, // 任意接口 key
  [key: number]: any, // 任意接口 key
}

const veg3:IVegetable = {
  name: '西红柿',
  taste: '甜',
  size: 50,
  color: '红色'
}

// 5）任意类型 随机的属性、数字描述索引的（除了必有的属性之外，其他任意）
const veg4:IVegetable = {
  name: '西红柿',
  taste: '甜',
  size: 50,
  color: '红色',
  'a': 1,
  b: 2,
  [Symbol()]: 'abc',
  0: 1
}

interface IArray { // 索引接口
  [key: number]: any
}
let arr1:IArray = [1, 2, 3]
let arr2:IArray = { 0: 1, 1: 2, 3: 'abc'}

// 通过索引访问符来获取内部类型
interface ResponseData {
  username: string,
  token: string
}
interface ReturnVal {
  code: number,
  data: ResponseData
}
type ICode = ReturnVal['code']
type IUsername = ReturnVal['data']['username'] // 可以用于取值的类型
// type IKeys = ReturnVal['code' | 'data'] // 取值的类型
type IKeys = ReturnVal[keyof ReturnVal] // 取值的类型



// 接口可以实现 - 接口的实现都是通过类来实现，接口中一个类可以实现多个接口
// 一个接口可以继承多个接口，接口可以用于继承类
interface SpeakChinese {
  speakChinese(): void
}
interface SpeakEnglish {
  speakEnglish(): void
}
class Speak {
  public a!: string
}
interface Speakable extends SpeakEnglish, SpeakChinese, Speak {
  speak(): void // 实现的是原型方法
  // speak: () => void // 实现的是实例方法
}

class Speaker implements Speakable {
  public a!: string
  speakEnglish(): void {
    throw new Error("Method not implemented.")
  }
  speak() {
    return 100
  }
  speakChinese(): void {
    throw new Error("Method not implemented.")
  }
}



// 如何表示要传入的是一个类
class Dog {

}
class Cat {
  
}
// 类类型，不能描述类本身，描述的是实例
// 类的类型，需要通过 typeof 来取类型
function creatinstance (clazz: typeof Dog) {
  return new clazz
}
const instance = creatinstance(Cat)

// 泛型：泛型坑位（函数的形式参数）刚开始类型不确定，通过使用的时候来确定类型
function creatinstance2<T> (clazz: new () => T) {
  return new clazz
}
// const instance2 = creatinstance2<Cat>(Cat) // 可以省略形式参数
const instance2 = creatinstance2(Cat)

// 描述构造函数
// interface IClazz<T> {
//   new (name: string): T
// }
type IClazz<T> = new (name: string) => T

class Cat2 {
  constructor(public name: string) {}
}
function creatinstance3<T> (clazz: IClazz<T>, name: string) {
  return new clazz(name)
}
const instance3 = creatinstance3(Cat2, 'tom')

export {}