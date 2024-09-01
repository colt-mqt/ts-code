// 使用ts的时候，需要将编写的ts代码转换成js执行
// typescript 这个模块会进行文件的编译

// npm install typescript -g

// 最终直接生成 js 文件再运行
// tsc --init 初始化ts的配置文件

// 通过构建工具将代码转化成 js 再运行 webpack、rollup、esbuild...
// npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve -D

let a = 'test'
export {} // 认为当前为独立模块，不受外部干扰，也不会影响外部（避免了全局变量污染）