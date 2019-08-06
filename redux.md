<!-- MarkdownTOC levels="2,3" -->

- [Redux Basic](#redux-basic)
	- [Store](#store)
	- [State](#state)
	- [Action](#action)
	- [Reducer](#reducer)
	- [Redux Flow](#redux-flow)
- [Middleware](#middleware)

<!-- /MarkdownTOC -->


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

可以看成一个容器，用来保存数据，整个应用只能有一个 Store，它通过 `createStore()` 方法进行创建，它可以接受的参数：
- Reducer
- defaultState
- applyMiddleware()

Store 的职责：

1. 维持应用的 state
2. 提供 `Store.getState()` 来获取 state
3. 提供 `Store.dispatch(action)` 来通知 reducer 根据 action 更新 state，是 View 发出 Action 的唯一方式
4. 通过 `subscribe(listener)` 来注册监听器和通过其返回函数销毁监听器，表示一旦 state 发生变化，立即调用监听函数，在 React 项目中，只要把 `render()` 或者 `setState()` 方法放入监听函数中，就可以实现 View 的自动渲染

### State

> "建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据"

State 可以看作是对 Store 对象内某个时间点的数据的一次快照，一个应用只有一个 Store，只要 state 相同则可以判定其视图相同


### Action

**Action仅仅用来描述有事情发生这一事实，并不会更新 state**

一般来说，用户接触不到 Store，自然也无法改变它，用户接触到的是视图，所以改变 Store 内 state 是用户通过视图发起的，而这个过程的媒介就是 Action

Action 就是 View 发起的通知，来通知 state 需要变化

Action 是一个对象，`type` 属性为必需属性，用来表示 Action 名字

只有两个对象完全相同时，则两个 Action 才相等，否则为独立的 Action，因此随着传递信息的不同，会产生很多个 Action，这时需要封装一个函数来作为 Action Creater(即 Action 生成器，用来简化代码结构)

### Reducer

Store 收到一个新的 Action 后，通过 Reducer 进行相应的计算，返回一个新的 state

Reducer 可以简单表示为 `Reducer(currentState, action) -> newState`，它是一个纯函数(即输入相同，则输出一定相同)，接受 Action 和 当前 State 作为参数，返回一个新的 State

在实际应用中，Reducer 不用手动调用，在生成 Store 实例时，将其作为参数传入，之后每当 `store.dispatch(action)` 传递来一个新的 action 时，就会自动调用 Reducer

**reducer 一定要保持纯净，可以理解为：只要传入参数相同，返回计算得到的下一个 state 就一定相同，没有特殊情况、没有副作用、没有 API 请求、没有变量修改，单纯执行计算**

因此，在 reducer 一定不可以：
1. 修改传入参数 state，可以利用 `Object.assign({}, state)` 来进行拷贝，也可以使用展开运算符进行拷贝
2. 执行有副作用的操作，比如 API请求和路由跳转
3. 调用非纯函数，比如 `Date.now()`，`Math.random()` 等
4. 一定要返回 state，如果遇到未知的 action，可以直接返回旧的 state

### Redux Flow

了解以上几点概念之后，可以对 redux 的工作流程做一个梳理：

1. 用户在 React Components 通过视图层发出 Action，即 `dispatch(action)`
2. Store 接受到 Action 之后调用 Reducer，向其传递 state 和 action 参数，并且接收 Reducer 返回的新 State
3. State 一旦发生变化，就会调用 `subscribe(listener)` 监听函数，listener 通过 `getState()` 获得当前的 State，再利用 React 的 setState() 来重新窜然


## Middleware

中间件就是一个函数，对 `store.dispatch(action)` 进行改造，在发出 Action 和执行 Reducer 之间，添加其他功能

在 Redux 中，在创建 Store 时，通过传递 `applyMiddleware(middleware1,...)` 参数来引入中间件

**注意：中间件的引入也需要注意顺序**




