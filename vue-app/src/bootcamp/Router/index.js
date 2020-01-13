import Vue from 'vue';
import Router from 'vue-router';
import Page1 from './Page1';
import Page2 from './Page2';
import PageChild from './PageChild';
import PageNull from './PageNull';

Vue.use(Router);

// 不仅定义了匹配规则，同时也定义了匹配优先级
const routes = [
    { path: '/page1/:name', component: Page1, name:'page1' },
    {
        path: '/page2', component: Page2,
        children: [{
            path: 'child/:name',
            component: PageChild,
            props: true
        }]
    },
    { path: '*', component: PageNull, alias: '/page2' }
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to, from);
    next();
});

router.afterEach((to, from) => {
    console.log(to, from);
});

export { router };