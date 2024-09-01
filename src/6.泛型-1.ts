// 泛型：可以用于 函数、接口、类、type

// 如果在使用时无法确定当时的类型，可以采用泛型来定义

const createArr = <T>(times: number, val: T) => {
  return Array.from({ length: times }).fill(val) as T[]
}
console.log(createArr(3, '1'));

// 写辅助函数的时候可以写多个泛型用于保存值
function swap<T, K>(tuple: [T, K]): [K, T] {
  return [tuple[1], tuple[0]]
}
const s = swap(['aa', true])


// const forEach = <T>(arr: T[], callback: (val: T) => void) => {
//   for (let i = 0; i < arr.length; i++) {
//     callback(arr[i])
//   }
// }

// IForEach<T> 表示使用接口的时候确定类型
// <T>(): void 在使用这个函数的时候传入类型
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

// 1）错误写法 泛型的使用需要能正常推导，但是内部的 callback 并没有真正执行，还是认为 arr: T[]
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

export { }
