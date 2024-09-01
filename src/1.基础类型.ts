
// ts 关注的是类型，不是业务
// 类型的分类：基础类型、高级类型、内置类型、自定义类型、类型体操

// ts 的特点，如何学习
// 1. ts 的目的是什么？从安全角度来考虑使用（考虑在赋值时，是否会发生错误）（插件：error lens）
// 2. ts 是用来检测类型的，只是提示作用，不是在运行时发生的
// 3. ts 编译之后类型就消失了，不存在类型了，最终生产环境下可以增添.d.ts时来增加类型声明

// 特点：编写代码时，并不是所有变量都要添加类型（ts中支持类型推导，根据赋值来猜测，如果猜测不对或者无法正确的推导，则需要自己写类型）

// 1. string、number、boolean
const name:string = 'jj'

// 基础类型、包装类型
// 规范：小写的类型一般用于描述基本类型，大写的用来描述的是实例类型
let s1:string = 'jj'
// let s2:string = new String('abc')
let s3:String = '1' // 赋值时，子集可以赋予父集
let s4:String = new String('abc') // 类的类型，类类型（String类），用来描述实例的
// 给一个实例添加类型
class Animal {

}
let aniaml:Animal = new Animal

// 2. 数组：用于存储多个类型相同的集合
// 类型[]、Array<类型>(泛型) 都可以声明数组
let arr1:number[] = [1,2,3]
let arr2:Array<number> = [1,2,3]
// 联合类型
let arr3:(number | string)[] = [1,2,3,'abc']
// 元组：新增内容时不能增加额外的类型的值，而且增加后无法访问
// + 数组要求的是存储格式按照特定类型来存储，不关心位置
// + 如果关心位置（某个位置类型确定），使用元组 tuple，赋值要求符合这个结构和顺序
let tuple:[string, number, string] = ['1', 2, '3']
tuple.push(9)
// let item = tuple[3] // 后增加的无法访问，安全问题


// 3. 枚举：自带类型的对象（就是一个对象）
// + 约定一组格式会用枚举 状态码 权限、数据格式、标志位
// + 维护一组常量，可以用枚举
enum STATUS {
  'OK',
  'NO_OK' = 100,
  'NOT_FOUND',
  'FOUND' = 'found',
  // 'test'
}
// 类型可以进行反举，枚举没有值会根据上面的索引来自动累加
// 异构枚举 就是枚举中不光有数字，还有字符串，异构枚举上一个是字符串，下一个无法推导
const r1 = STATUS[0] // OK
const r2 = STATUS['OK'] // 0
const r3 = STATUS[101] // NOT_FOUND
console.log(1, r1, r2, r3);
// 常量枚举 不会额外编译成对象，更节约
const enum ASTATUS {
  'OK' = 'ok',
  'NO_OK' = 100,
  'NOT_FOUND',
  'FOUND' = 'found'
}
const ar1 = ASTATUS['OK'] // ok
const ar2 = ASTATUS['NOT_FOUND'] // 101
const ar3 = ASTATUS['NO_OK'] // 100
console.log(1, ar1, ar2, ar3);


// 4. null、undefined 正常情况下只能赋予null、undefined
// 禁用非严格检测(tsconfig.json 中 "strictNullChecks": false)，null、undefined 可以赋值给任何类型（任何类型的子类型）
const u:undefined = undefined
const n:null = null

// 5. void 代表空类型
// undefined 可以赋给 void，都代表空(undefined 是 void 的子类型)
function a():void {
  return undefined
}

// 6. never 永远不
// + 函数永远无法执行完毕
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
toArray('abc')

// 7. any 任何类型 能不写就不写，会导致类型丧失检测
// unkonw any 的安全类型
let a1:any = 1
let a2:unknown = 1


// 8. object 引用类型
function create(val:object) {

}
create({})
create(function(){})
create([])

// 9. symbol bigint
const symbol:symbol = Symbol()
// es2016 不支持Bigint(tsconfig.json中配置 "lib": ["ESNext"])
const bigInt:bigint = BigInt(Number.MAX_SAFE_INTEGER + 1)
console.log(bigInt);



// 总结
// string number boolean 数组 元组 枚举 null undefined void never any object symbol bigint

export {}