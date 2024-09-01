// 类：类的组成： 构造函数、属性（实例属性，原型属性）、方法（实例方法，原型方法，静态方法）、访问器、静态相关的配置

class Circle {
  private x:number
  public y:number
  public fn:() => void
  constructor(x:number, y:number = 200) {
    this.x = x
    this.y = y
    this.fn = () => {}
  }
}
// public 公开属性，类的实例在外部可以访问这个属性，类的内部也可以访问，继承的子类也可以访问
// protected 我自己能访问，儿子也能访问，外部无法访问
// private 私有的，自己能访问
// readonly 只读属性，意味着初始化后不能修改

class Animal {
  // protected readonly name:string
  constructor(protected name:string) { // 等价于 每个属性增添了 public
    this.name = name // 属于初始化阶段，可修改
  }
  // 原型方法 就是每一个实例共享的方法
  // 父类提供的方法，子类是可以进行方法重写的
  // 原型的函数：void 意味不关心函数的返回值
  changeName(value: string):void {
    this.name = value
  }
  // 原型属性 需要通过 访问器 实现
  get aliasName() {
    return '$' + this.name
  }
  set aliasName(name: string) {
    this.name = name
  }
  // 静态属性 静态方法
  static a = 1
  static getA() {
    return this.a
  }
}
// super
// + 在构造函数、static函数中指向的是父类
// + 在原型的方法、属性访问器中指向的是父类的原型
class Cat extends Animal {
  constructor(name: string, public age: number) {
    super(name) // Animal.call(this)
    this.age = age
  }
  // 子类重写父类方法要兼容，赋予的函数可以兼容父类
  changeName(value: string) {
    super.changeName(value)
    // this.name = value
    return 'abc'
  }
}
const tom1 = new Cat('tom', 30)
const tom2= new Cat('tom', 30)
// tom.changeName('jerry')



class Singleton {
  static instance = new Singleton() // 自己本身创造一个实例，后续一直用这个，不产生多个
  protected constructor() { // 增加 protected 后，构造函数不能被 new

  }
  static getInstance() {
    return this.instance
  }
}
let instance = Singleton.getInstance()

// ts 中有抽象类概念 abstract
// 抽象类可以含有非抽象的方法和属性
// 抽象类可以被继承，抽象类中抽象方法子类必须要实现
{
  abstract class Animal {
    public abstract a:string
    drink() { // 非抽象
      console.log('喝水');
    }
    abstract eat():void // 抽象方法，父类没有实现，子类必须实现
  }
  class Cat extends Animal {
    public a!:string
    eat(): void {
      throw new Error()
    }
  }
}
export {}