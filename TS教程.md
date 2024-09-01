# TS 教程

### 介绍

特点：

* ts 关注的是类型，不是业务
* ts 是用来检测类型的，只是提示作用，不是在运行时发生的
* ts 编译之后类型就消失了，不存在类型了，最终生产环境下可以增添.d.ts时来增加类型声明

## 基础类型

TypeScript 提供了JavaScript 的所有基本数据类型，以及增加了额外的类型

本节将介绍以下类型：`string number boolean 数组 元组 枚举 null undefined void never any object symbol bigint`

### string

小写的一般用于描述基本类型；大写的用来描述实例类型

~~~ts
let s1:string = '1'
~~~

赋值时，子集可以赋予父集

~~~ts
let s2:String = '1'
// let s3:string = new String('abc') // 错误🙅
let s4:String = new String('abc') // 类的类型，类类型（String类），用来描述实例

// 给一个实例添加类型
class Animal { }
let aniaml:Animal = new Animal
~~~

### number

接受整数、浮点数，以及各种进制

~~~ts
let n1: number = 10; // 十进制
let n2: number = 0b1010; // 二进制
let n3: number = 0o12; // 八进制
let n4: number = 0xa; // 十六进制
~~~

### boolean

~~~ts
let b1: boolean = false;
let b2: boolean = true;
~~~

### 数组

概念：用于存储多个类型相同的集合

声明方式：类型[] 或者 Array<类型>

~~~ts
let arr1:number[] = [1,2,3]
let arr2:Array<number> = [1,2,3]
~~~

### 联合类型

声明方式：(number | string)

~~~ts
let arr3:(number | string)[] = [1,2,3,'abc']
~~~

### 元组

特点：新增内容时不能增加额外的类型的值，而且增加后无法访问

与数组的比较：

* 数组要求的是存储格式按照特定类型来存储，不关心位置
* 如果关心位置（某个位置类型确定），使用元组 tuple，赋值要求符合这个结构和顺序

~~~ts
let tuple:[string, number, string] = ['1', 2, '3']
tuple.push(9)
// let item = tuple[3] // 后增加的无法访问，安全问题
~~~

### 枚举 enum

概念：自带类型的对象（本质就是一个对象）

使用场景：

* 约定一组格式会用枚举 比如状态码、权限、数据格式、标志位等
* 维护一组常量，可以用枚举

~~~ts
enum STATUS {
  'OK',
  'NO_OK' = 100,
  'NOT_FOUND'
}
~~~

特点：类型可以进行反举，枚举没有值会根据上面的索引来自动累加

~~~ts
const r1 = STATUS[0] // OK
const r2 = STATUS['OK'] // 0
const r3 = STATUS[101] // NOT_FOUND
~~~

### 异构枚举

概念：枚举中不光有数字，还有字符串

注意⚠️：异构枚举上一个是字符串时，下一个无法自动推导

~~~ts
enum STATUS {
  'OK',
  'NO_OK' = 100,
  'NOT_FOUND',
  'FOUND' = 'found',
  // 'test' // 无法推导
}
~~~

### 常量枚举

特点：不会额外编译成对象，更节约

~~~ts
const enum ASTATUS {
  'OK' = 'ok',
  'NO_OK' = 100,
  'NOT_FOUND',
  'FOUND' = 'found'
}
const ar1 = ASTATUS['OK'] // ok
const ar2 = ASTATUS['NOT_FOUND'] // 101
const ar3 = ASTATUS['NO_OK'] // 100
~~~

### null、undefined

* 正常情况下只能赋予它们自己本身

* 禁用非严格检测(tsconfig.json 中 "strictNullChecks": false)，null、undefined 可以赋值给任何类型（意味着是任何类型的子类型）

~~~ts
const u:undefined = undefined
const n:null = null
~~~

### void

概念：代表空类型

特点：undefined 可以赋给 void，都代表空( undefined 是 void 的子类型)

~~~ts
function fn():void {
  return undefined
}
~~~

### never

概念：**函数永远无法执行完毕**

场景：

* 函数无限循环
* 函数出错
*  if/else 条件都走完，没有遗漏，后面的类型就是 never

~~~ts
function whileTrue():never {
  while(true) { // 函数无法达到执行完毕的状态
  }
}

function throwError():never {
  throw Error() // 出错函数无法执行完毕
}

function validateCheck(v:never) {}
// 如果 if/else 条件都走完了，没有遗漏，后面的类型就是 never（完整性保护）
function toArray(val:number | string | boolean) {
  if (typeof val === 'number') {
    return val.toString().split('').map(Number)
  }
  if (typeof val === 'string') {
    return val.split('')
  }
  if (typeof val === 'boolean') {
    return val.toString().split('')
  }

  // never 类型只能被 never 类型来赋予值
  const n:never = val
  validateCheck(val) // 代码的完整性保护
}
~~~

### any

任何类型

注意：能不写就不写，会导致类型丧失检测

~~~ts
let a1:any = 1
~~~

### unkonwn

any 的安全类型

~~~ts
let a2:unknown = 1
~~~

### object

引用类型

~~~ts
function create(val:object) {

}
create({})
create(function(){})
create([])
~~~

### symbol

~~~ts
const symbol:symbol = Symbol()
~~~

### bigint

~~~ts
// es2016 不支持Bigint(tsconfig.json中配置 "lib": ["ESNext"])
const bigInt:bigint = BigInt(Number.MAX_SAFE_INTEGER + 1)
~~~



## 类型断言

### 断言前置知识

开始断言之前，我们先了解一些基础知识

> 声明类型时，如果没有标识类型，为 any
>
> 没有赋值的变量默认是 undefined， 类型为 any
>
> const 是常量，意味它的值不会被修改，所以它的类型是一个字面量类型
>
> ~~~ts
> const a:1 = 1
> const str:'abc' = 'abc'
> ~~~

### 断言问题

以联合类型的使用场景为例：联合类型，只能采用公共的方法（API）来使用

1. 从安全性考虑，联合类型会先定义值，再使用

   ~~~ts
   let strOrNum:string | number
   strOrNum = '1'
   // strOrNum.split('')
   strOrNum = 1
   // strOrNum.toFixed()
   ~~~

2. 断言类型后再使用

> 两种使用方式
>
> * **as 断言 **成某种类型（一定是联合类型中的某一个）
>
> * **！非空断言** 表示这个值一定不是空的
>
> 声明方式：值 as xxx 或者 <xxx>值（一般用于联合类型，将大范围的类型断言成子类型）

~~~ts
let strOrNum1:string | number
// (strOrNum1! as string).split('');
(<number>strOrNum1!).toFixed(3);
~~~

3. 语法区别

> * ! ts 语法
>
> * ? js 语法，链判断运算符，有值再去取值；取值操作，不能赋值
>
> * ?? 合并空值运算符 除了 null、undefined 其他都是 true，例： `let val = 0 ?? 100; // 0`

~~~ts
let ele = document.getElementById('app')!;
ele!.style.background = 'red';
// ele?.style.background
(ele as HTMLElement).style.background = 'red';
~~~

### 双重断言

**一般不建议使用，会破坏原有的关系**

~~~ts
let strOrNum1:string | number
(strOrNum1! as unknown as boolean) // 这里将 strOrNum1 断言成了 boolean
let direction:'up'|'down'|'left'|'right' = 'up'
let up:'down' = direction as 'down' // 这里将 direction 断言成了 'down'，破坏了 direction = 'up' 的关系
~~~

### 类型别名 type

特点：

* 将类型提取出来
* type 类型会提升到顶部

~~~js
type Direction = 'up'|'down'|'left'|'right' // 快速构建一个可以复用的类型
let direction1:Direction = 'up'
let up:'down' = direction as 'down'
~~~



## 函数类型

函数中的类型通过函数的声明方式、函数的参数、函数的返回值来体现

我们知道，在 JS 中 function 关键字声明的函数可以提升到当前作用域顶部，但是对于 TS 来说，存在着某些不一样的地方，下面通过 code 来感受一下他们之间的差异

对于 TS 来说：

* 函数关键字声明的函数，不能标注函数类型
* 表达式声明的函数，必须赋予的值要满足定义的类型

### 函数类型的定义

**声明方式**：`(a: any, b: any) => any ｜ {(a: any, b: any): any}`

~~~ts
const sum:(a: any, b: any) => any = function(a:string, b) {
  return a + b
}
// 或者
type ISum = {(a: any, b: any): any}
const sum:ISum = function(a:string, b:string) {
  return a + b
}
~~~

注意⚠️：如果标明了函数的类型，在使用函数的时候以标明的为准（上面例子中以ISum为准）

### 参数与可选参数

1. ts 中函数需要特别注意参数 this 的问题

* 尽量不采用 this 作为函数的上下文，this 的缺陷就是**类型推导问题**
* 如果想限制 this 类型， 需要手动指定，且放在参数列表第一位，此时第一个不是行参

~~~ts
function getValue(this: { name: string, age: number }, key) {
  return this[key];
}
const person = { name: 'jj', age: '100' }
getValue.call(person, 'name')
~~~

2. 可选参数 ?

* 意味着可不传和 必须得传的参数
* 可选参数只能在参数列表中的后面

~~~ts
const sum1 = function(a:string, b?:string) {
  return a + b
}
sum1('1', undefined)
~~~

### typeof + type

typeof 根据值来获得类型；我们可以配合 type 来声明新的类型

~~~ts
const person = { name: 'jj', age: '100' }
type IPerson = typeof person // IPerson = { name: string, age: string }
function getValue1(this: IPerson, key) {
  return this[key];
}
~~~

### keyof

作用：可以获取对象中的类型，作为联合类型

~~~ts
const person = { name: 'jj', age: '100' }
type IPerson = typeof person // IPerson = { name: string, age: string }
type IKeys = keyof IPerson // IKeys = "name" | "age"
function getValue1(this: IPerson, key: IKeys) { // key 只能传 "name" 或 "age"
  return this[key];
}
~~~

### 重载

**函数的返回值**是在 {} 前面标识

~~~ts
const sum2:(...args:any[]) => any = (...args:any[]): any => {
  return 1
}
~~~

何为重载？

重载是指一个函数可以有不同的参数和返回值，也就是有不同的函数签名

* 对于强类型语言可以一个函数写多遍（参数不同）
* js 实现靠的是 arguments

~~~ts
function toArray(value:string | number):string[] | number[] { // 所有的实现,输入和返回不一定是相同类型
  return []
}
let arr1 = toArray('abc')
let arr2 = toArray(123)

~~~

1. 类型上的重载

~~~ts
// 声明两个同名函数，参数类型不同
function toArray(value:string):string[] // 具体的某一种方案
function toArray(value:number):number[]
~~~

2. interface 的方式声明函数重载

......

3. 函数类型的交叉类型实现重载

......

其它知识点：函数式编程 不等于 组合式 api

* 函数式编程 入参一定，返回值一定
* 组合式 api 可以没有入参

## 接口

### 概念

1. 抽象类（有抽象也有非抽象），接口必须都是抽象的（没有具体实现）
2. 就是描述数据的结构、或者形状的，定义好结构，再去针对结构来实现

### type 和 interface 区别

1. 一般情况下 描述对象、类，采用 interface 更多一些，interface 无法声明联合类型
2. type 可以快速声明类型，联合类型、工具类型只能采用 type，type 不能重名
3. type 用得更多，能用 type 就不用 inerface，复杂类型用 type

### interface 的描述对象

1. 接口可以描述对象结构

> 子可以赋予给父，需要把一个值赋予另一个值；如果是声明必须一致

```ts
interface IPerson {
  username: string // 类型 不是具体实现
  age: number
}
let person:IPerson = {
  username: 'abc',
  age: 20,
  // address: 'dizhi' // 报错 声明必须一致
}
// 子可以赋予给父，需要把一个值赋予另一个值，如果是声明必须一致
let obj = {
  username: 'abc',
  age: 20,
  address: 'dizhi'
}
// let person:IPerson = obj // 赋值的时候 会产生兼容性（子可以赋予给父，但是子取不出 address）
```

2. 接口可以描述函数

```ts
interface ICount {
  (): number
  count: number
}
// let 可以修改， const 标识不能修改（如果给函数增加类型定义 函数不能被修改时只能用 const）
// let counter: ICount = () => {
//   return counter.count++
// }
const counter: ICount = () => {
  return counter.count++
}
counter.count = 0
```

### interface 的使用方法

1. 可通过 ？ 表示接口的属性可有可无

```ts
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
```

2. **断言**的方式来进行赋值 as IVeg

```ts
const veg2:IVeg = {
  name: '西红柿',
  taste: '甜',
  size: 50
} as IVeg
```

3. **接口的合并** 同名的会进行合并，自定义类型的时候会使用，自己的业务逻辑用的少（一般用于扩展源码）

```ts
interface IVeg {
  color?: string
}
```

4. 可以扩展一个新类型再使用，可以扩展属性

```ts
interface IVegetable extends IVeg {
  color?: string,
}
const veg3:IVegetable = {
  name: '西红柿',
  taste: '甜',
  size: 50,
  color: '红色'
}
```

5. 任意类型 随机的属性、数字描述索引的（除了必有的属性之外，其他任意）

```ts
interface IVegetable extends IVeg {
  color?: string,
  [key: string]: any, // 任意接口 key
  [key: number]: any, // 任意接口 key
}
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
```

### 索引接口

```ts
interface IArray { // 索引接口
  [key: number]: any
}
let arr1:IArray = [1, 2, 3]
let arr2:IArray = { 0: 1, 1: 2, 3: 'abc'}
```

1. 通过索引访问符来获取内部类型

```ts
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
```

### 自定义实现接口

接口的实现都是通过类来实现

> + 接口中一个类可以实现多个接口
> + 一个接口可以继承多个接口
> + 接口可以用于继承类

```ts
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
```

## 泛型

### 概念

1. 如果在使用时无法确定当时的类型，可以采用泛型来定义（本质就是占坑位）
2. 一般用于 函数（参数，返回值）、对象、接口、类

### 使用示例

例子1🌰

```ts
class Dog { }
class Cat { }
// 类类型，不能描述类本身，描述的是实例
// 类的类型，需要通过 typeof 来取类型
function creatinstance (clazz: typeof Dog) {
  return new clazz
}
const instance = creatinstance(Cat)
// -------------------------------------------
function creatinstance2<T> (clazz: new () => T) {
  return new clazz
}
// const instance2 = creatinstance2<Cat>(Cat) // 可以省略形式参数
const instance2 = creatinstance2(Cat)
// -------------------------------------------
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
```

例子2🌰

```ts
const createArr = <T>(times: number, val: T) => {
  return Array.from({ length: times }).fill(val) as T[]
}
console.log(createArr(3, '1'));

// 写辅助函数的时候可以写多个泛型用于保存值
function swap<T, K>(tuple: [T, K]): [K, T] {
  return [tuple[1], tuple[0]]
}
const s = swap(['aa', true])
```

例子3🌰

```ts
const forEach = <T>(arr: T[], callback: (val: T) => void) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}
forEach(['A', 1, 2], function (val) {
  console.log(val);
})
```

```ts
// IForEach<T> 表示使用接口的时候确定类型
// <T>(): void 在使用这个函数的时候传入类型
/** 以下两种写法一样 */
// interface IForEach {
//   <T>(arr: T[], callback: (val: T) => void): void
// }
type IForEach = <T>(arr: T[], callback: (val: T) => void) => void

const forEach: IForEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}
forEach(['A', 1, 2], function (val) {
  console.log(val);
})
```

```ts
// 错误写法 泛型的使用需要能正常推导，但是内部的 callback 并没有真正执行，还是认为 arr: T[]
type ICallback2 = <T>(val: T) => void
type IForEach2 = <T>(arr: T[], callback: ICallback2) => void
const forEach2: IForEach2 = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}
forEach2(['A', 1, 2], function (val) {
  console.log(val);
})

// ---------------------------------------
type ICallback3<T> = (val: T) => void
type IForEach3 = <T>(arr: T[], callback: ICallback3<T>) => void
const forEach3: IForEach3 = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}
forEach3(['A', 1, 2], function (val) {
  console.log(val);
})
```

### 泛型默认值

* 泛型的默认值来解决泛型的值默认情况

```ts
interface APIResponse<T = any> {
  error: number,
  data: T,
  message?: string
}
interface LoginInfo {
  username: string,
  token: string
}
// 模拟接口返回（返回值可能都是统一的）
// function login(): APIResponse: <LoginInfo>
function login(): APIResponse {
  return {
    error: 1,
    data: {
      username: 'a',
      token: 'xxx'
    },
    message: '成功'
  }
}
```

* 配合联合类型使用

```ts
type IUnion<T = boolean> = T | string | number
type t1 = IUnion
type t2 = IUnion<string[] | number[]>
```

### 泛型约束

* 泛型是用户传递的类型，在使用泛型的时候都要添加约束

* 使用泛型的时候，不能直接做运算（因为无法保证结果 t+t=t)

```ts
function getVal<T extends string | number>(val: T): T { // 约束类型T 需要是 string | number 子类型
  // 输入和返回类型要相同（这里可以和重载进行对比）
  return val
}

getVal('123')
getVal(123)
// getVal(true) 类型不满足 string | number
```

```ts
function getLen<T extends { length: number }>(val: T) {
  return val.length
}

getLen('123')
getLen({ length: 1 })
// getLen(123) 约束是某种类型的子类型
```

### 函数改造

改造前：

```ts
function getobjval(target: typeof person, key: keyof typeof person) { // 必须有person，相当于写死了
  return target[key]
}
```

改造后：

```ts
// ts 只是对类型做校验，对于真正的业务逻辑不关心
function getObjval<T extends object, K extends keyof T>(target: T, key: K) {
  return target[key]
}
let person = { name: 'aa', age: 20 }
let animal = { name: 'bb', age: 20, address: '123' }
getObjval(person, 'name')
getObjval(animal, 'address')
```

### 类中泛型

```ts
// 类中的泛型
class MyList<T extends string | number> {
  private arr: T[] = []
  add(val: T) {
    this.arr.push(val)
  }
  getMax(): T {
    let max = this.arr[0]
    // 省略业务逻辑...
    return max
  }
}
const list = new MyList
list.add(1)
list.add(200)
list.getMax()
```



### 注意

使用泛型要**注意**以下两种方式的区别

* IForEach<T> 表示使用接口的时候确定类型
* <T>(): void 在使用这个函数的时候传入类型

## 交叉类型

### 交叉类型与联合类型的区别

> 联合类型（并集 => 按位或 ｜） 交叉类型（交集 = > 按位与 &）

### 特性

```ts
interface Person1 {
  handsome: string
}

interface Person2 {
  high: string
}

let person1:Person1 | Person2 = {
  handsome: 's'
}
```

* 交叉类型 同时是两个类型的子类型

  ```ts
  let person2: Person1 & Person2 = {
    handsome: 'shuai',
    high: 'gao'
  }
  ```

* 最终的结果可以赋予给任何一个类型

  ```ts
  let p1: Person1 = person2
  let p2: Person2 = person2
  ```

* 如果两个类型不相同没有交集， & 后的结果是 never

  ```ts
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
  type IGender1 = Person5['gender'] // never
  type IGender2 = Person5['meta']['n'] // never
  
  function merge<T extends object, K extends object>(o1: T, o2: K) {
    return { ...o1, ...o2 }
  }
  let result = merge({ name: 'ab' }, { name: 123 })
  // result.name => 是never类型
  ```

### 扩展属性

使用交叉类型可以快速扩展属性

```ts
let obj = { name: 'ja', age: 24 }
let person: { name: string, age: number, address: string } = obj as typeof obj & { address: string }
```

