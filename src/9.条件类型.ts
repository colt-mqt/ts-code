
// 条件类型 - if/else 三元表达式

// 子类型 extends 父类型 = true

type StatusCode<T> = T extends 200 | 201 ? 'success' : 'fail'
type IReturnMessage = StatusCode<300>

// 类型级别
// 1）根据结构的角度分析
type IObj<T> = T extends { name: 'aa' } ? 'ok' : 'no ok'
type IPerson = IObj<{ name: 'aa', age: 20 }>
type IPerson1 = IObj<{}>

type Temp3 = object extends Object ? true : false // true
type Temp4 = Object extends object ? true : false // true
type Temp5 = Object extends {} ? true : false // true

// 2)从类型角度来进行分析
// never 是任何类型的子类型
// 字面量类型
// 基础类型
// 包装类型
// any unknown(最顶层)
type T1 = never extends 'str' ? true : false // true
type T2 = 'str' extends string ? true : false // true
type T3 = string extends String ? true : false // true

// {} 和 object 可以看成字面量类型
type T4_1 = String extends object ? true : false // true
type T4_2 = String extends {} ? true : false // true
type T4_3 = String extends Object ? true : false // true

type Temp1 = {} extends object ? true : false // true
type Temp2 = object extends {} ? true : false // true

type T5 = string extends any ? true : false // true
type T6 = string extends unknown ? true : false // true

type T7 = any extends unknown ? true : false // true
type T8 = unknown extends any ? true : false // true

type T9 = any extends 1 ? true : false // boolean （条件类型是有分发机制的）1 + 除了1的部分 true | false

// any 自带分发的机制
// never 如果通过泛型传入，此时只会返回 never
type T10 = never extends 1 ? true : false // true
type T11<T> = T extends 1 ? true : false
type Temp6 = T11<never> // never


// 通过条件类型来进行类型区分，条件语句也可以实现约束的效果
interface Fish {
  name: '鱼'
}
interface Water {
  name: '水'
}
interface Bird {
  name: '鸟'
}
interface Sky {
  name: '天'
}
type GetType<T extends Fish | Bird> = T extends Fish ? Water : Sky
type A1 = GetType<Bird> // Sky
// 分发导致的问题，什么时候会产生分发：
// 1. 联合类型通过泛型传递
// 2. 而且比较（extends）的时候会产生分发
// 3. 类型需要是裸类型（就是泛型自己，没有搭配，比如元组[Fish]就不是）

type A2 = GetType<Fish | Bird> // Water ｜ Sky
// 相当于：
// Fish extends Fish ? Water : Sky // Water
// Bird extends Fish ? Water : Sky // Sky

// 解决分发问题：变成非裸类型
// type GetType<T extends Fish | Bird> = T & {} extends Fish ? Water : Sky

type NoDistribute<T> = T & {}
// type UnionAssets<T, K> = T extends K ? true : false
type UnionAssets<T, K> = NoDistribute<T> extends K ? true : false
type U1 = UnionAssets<1 | 2, 1 | 2 | 3> // true
// type U2 = UnionAssets<1 | 2 | 3, 1 | 2> // boolean
type U2 = UnionAssets<1 | 2 | 3, 1 | 2> // false



// 判断两个类型是否完全一致 ？ 1｜2  1｜2
type isEqual<T, K, S, F> = NoDistribute<T> extends K ? NoDistribute<K> extends T ? S : F : F
type is = isEqual<1 | 2, 1 | 2, true, false>


// 例子
// 映射关系 可以考虑用泛型；参数个数不一致，类型和入参无关，考虑重载
type FormatVal<T> = T extends string ? string : T extends number ? number : never
function sum<T extends string | number>(a: T, b: T): FormatVal<T> {
  return a + (b as any)
}
let r1 = sum(1, 2)
let r2 = sum('s', 'v')


// 内置类型中有很多类型是基于条件类型的
// Extract Exclude NonNullable...

// Extract 相当于 type Extract<T, U> = T extends U ? T : never
type ExtractRes = Extract<1 | 2 | 3 | 4, 1 | 2> // 1 | 2

// Exclude 相当于 type Exclude<T, U> = T extends U ? never : T
type ExcludeRes = Exclude<1 | 2 | 3 | 4, 1 | 2> // 3 | 4

// NonNullable 相当于 type NonNullable<T> = T extends null | undefined ? never : T 或者 type NonNullable<T> = T & {}
const ele = document.getElementById('app')
type Ele = NonNullable<typeof ele>


export { }