import { Route, Switch } from 'react-router-dom';
import React from "react";

class Router extends React.Component {
    render () {
 		/**
 		 * props 接受配置参数
 		 * routers 代表下一级路由对象
 		 * defaultConfig 代表默认配置
 		 */
        const { routers, defaultConfig } = this.props;

        // 根据路由对象来生成不同的 Route
        let routeDate = defaultConfig;

        // 筛选出没有重定向的
        let defaultPath = routeDate.filter(function(item) {
        	return !item.redirect;
        });

        if (routers) {
            routeDate = routers;
        }
        return (
        	<Switch>
                {
                    defaultPath && defaultPath.map((item, i) => {
                        return <Route path={ item.path } component={ item.component } key={ "key" + item.key } exact={ item.exact }></Route>
                    })
                }
        	</Switch>
        );
    }
}

export default Router