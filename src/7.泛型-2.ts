
// 泛型的默认值来解决泛型的值默认情况
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

// 在平时开发中使用联合类型
type IUnion<T = boolean> = T | string | number
type t1 = IUnion
type t2 = IUnion<string[] | number[]>

// 泛型是用户传递的类型，在使用泛型的时候都要添加约束 => 泛型约束
// 使用泛型的时候 不能直接做运算（无法保证结果 t+t=t)
function getVal<T extends string | number>(val: T): T { // 约束类型T 需要是 string | number 子类型
  // 输入和返回类型要相同（这里可以和重载进行对比）
  return val
}

getVal('123')
getVal(123)
// getVal(true) 类型不满足 string | number

function getLen<T extends { length: number }>(val: T) {
  return val.length
}

getLen('123')
getLen({ length: 1 })
// getLen(123) 约束是某种类型的子类型


function getobjval(target: typeof person, key: keyof typeof person) { // 必须有person，相当于写死了
  return target[key]
}
// 改造
// ts 只是对类型做校验，对于真正的业务逻辑不关心
function getObjval<T extends object, K extends keyof T>(target: T, key: K) {
  return target[key]
}
let person = { name: 'aa', age: 20 }
let animal = { name: 'bb', age: 20, address: '123' }
getObjval(person, 'name')
getObjval(animal, 'address')


// 类中的泛型
class MyList<T extends string | number> {
  private arr: T[] = []
  add(val: T) {
    this.arr.push(val)
  }
  getMax(): T {
    let max = this.arr[0]
    // 省略业务逻辑
    return max
  }
}
const list = new MyList
list.add(1)
list.add(200)
list.getMax()

// 泛型使用场景：函数（参数，返回值） 对象（坑位） 类 泛型的默认值和约束
export { }