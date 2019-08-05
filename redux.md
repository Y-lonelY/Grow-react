## Redux Basic

Redux 不局限于使用，它可以在任何框架内使用，它的出现主要是为了解决**多交互，多数据源下的代码结构和组件通信**

从组件角度看:
- 某个组件的状态，需要共享
- 某个状态需要在任何地方能够拿到，即一个全局状态
- 一个组件可以改变全局状态
- 一个组件需要改变另一个组件的状态

之前用 react 的 props 来实现通信，父组件向子组件通信方便，但是兄弟组件和子组件向父组件通信的话，前者需要提升状态至其公共父组件，后者需要声明一些额外的函数，不是很优雅

Redux 的设计思路：
1. Web 应用就是一个状态机，视图和状态一一对应
2. 所有的状态都保存在一个对象内

### Store

可以看成一个容器，用来保存数据，整个应用只能有一个 Store，它通过 `createStore()` 方法进行创建

Store 的职责：

1. 维持应用的 state
2. 提供 `Store.getState()` 来获取 state
3. 提供 `Store.dispatch(action)` 来通知 reducer 根据 action 更新 state
4. 通过 `subscribe(listener)` 来注册监听器和通过其返回函数销毁监听器

### State

State 可以看作是对 Store 对象内某个时间点的数据的一次快照，一个应用只有一个 Store，只要 state 相同则可以判定其视图相同

### Action

一般来说，用户接触不到 Store，自然也无法改变它，用户接触到的是视图，所以改变 Store 内 state 是用户通过视图发起的，而这个过程的媒介就是 Action

Action 就是 View 发起的通知，来通知 state 需要变化

Action 是一个对象，`type` 属性为必需属性，用来表示 Action 名字

只有两个对象完全相同时，则两个 Action 才相等，否则为独立的 Action，因此随着传递信息的不同，会产生很多个 Action，这时需要封装一个函数来作为 Action Creater(即 Action 生成器，用来简化代码结构)