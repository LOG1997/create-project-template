
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, useRouteError, redirect } from 'react-router-dom';
import Layout from '@/layouts';
import { replaceComponent } from './utils/replaceComponent'
import { routeGet } from 'virtual:routes-get';
const routes = [
    {
        path: "/",
        redirect: <Navigate to="/home" />,
    },
    {
        component: Layout,
        children: [
            ...replaceComponent(routeGet)
        ]
    }
];
// 生成路由
const generateRoutes = (routes: any) => {
    return routes.map((item: any) => {
        if (item.children) {
            generateRoutes(item.children);
        }
        item.redirect ? item.element = item.redirect :
            item.element = <Suspense fallback={<div>加载中</div>}>
                <item.component />
            </Suspense>

        return item;
    });
}
// loader


const routesRes = generateRoutes(routes)
console.log('😎routesRes:', routesRes)
const Router = createBrowserRouter(routesRes)

export { Router };