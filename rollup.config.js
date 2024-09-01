// 默认 rollup 打包的时候会查找当前目录下 rollup.config.js这个文件
// 采用 es 模块来编写配置文件，package.json 中配置 "type": "module",
// node 中有模块规范默认是 commonjs
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import path from 'path'
import { fileURLToPath } from 'url'
// import { createRequire } from 'module' // es 不支持 required 引入 可以通过 createRequire 拿到 require

// import.meta.url 当前文件的绝对路径 file://xxx/xx/xx
const __filename = fileURLToPath(import.meta.url) // fileURLToPath 将 file 绝对路径转换成正常的绝对路径
// es 模块下没有 __dirname（commonjs 规范），需要自己实现
const __dirname = path.dirname(__filename) // 当前文件所在的文件夹目录 绝对路径

// 打包的配置对象
export default {
  input: './src/index.ts', // 项目入口
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'), // 当前文件在当前目录下的 dist 目录
    format: 'iife', // (function(){})()
    sourcemap: true
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts'] }), // 第三方包的入口 入口文件可以是 js、ts
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    })
  ]
}