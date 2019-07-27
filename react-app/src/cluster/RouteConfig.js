import Home from '../view/Home'
import About from '../view/About'

const routeConfig = [{
    key: 1,
    title: 'home',
    exact: true,
    path: '/',
    component: Home
}, {
    key: 2,
    title: 'about',
    path: '/about',
    component: About
}];

export default routeConfig;