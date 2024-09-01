// 声明类型时，如果没有标识类型，为 any
// 没有赋值的变量默认是 undefined 类型为 any

// const 是常量，意味它的值不会被修改，所以它的类型是一个字面量类型
const a:1 = 1
const str:'abc' = 'abc'

// 断言问题
// 联合类型，只能采用公共的方法来使用

// 1. 从安全性考虑，联合类型会先定义值，再使用
let strOrNum:string | number
strOrNum = '1'
// strOrNum.split('')
strOrNum = 1
// strOrNum.toFixed()

// 2. 断言类型后再使用
// + as 断言成某种类型（一定是联合类型中的某一个）
// + ！非空断言 表示这个值一定不是空的
let strOrNum1:string | number
// (strOrNum1! as string).split('');
(<number>strOrNum1!).toFixed(3)
let ele = document.getElementById('app')!
// + (! ts语法) (? js 语法，链判断运算符，有值再去取值；取值操作，不能赋值) (?? 合并空值运算符 除了 null、undefined 其他都是 true)
ele!.style.background = 'red'
// ele?.style.background
// (ele as HTMLElement).style.background = 'red'
let val = 0 ?? 100; // 0
// + 值 as xxx 或者 <xxx>值 一般用于联合类型，将大范围的类型断言成子类型

// + 双重断言 一般不建议使用，破坏原有的关系
(strOrNum1! as unknown as boolean)
let direction:'up'|'down'|'left'|'right' = 'up'
let up:'down' = direction as 'down'

// 3. 类型别名 将类型提取出来
// type 类型会提升到顶部
type Direction = 'up'|'down'|'left'|'right' // 快速构建一个可以复用的类型
let direction1:Direction = 'up'
let up1:'down' = direction as 'down'




export {}