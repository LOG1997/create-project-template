import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { Layout, theme } from 'antd';
import { asyncGetUserinfo } from '@/reduce/modules/user';
import { routerBeforeEach } from '@/router/RouterGuard';
import HeaderContent from './HeaderContent';
import '@/style/layout/index.scss'

const { Content } = Layout;
const LayoutContainer = () => {

    const dispatch = useDispatch();
    dispatch(asyncGetUserinfo() as any)


    return (
        <Layout className='layout'>
            {/* <SiderMenu collapsed={collapsed} ></SiderMenu> */}
            <Layout className="site-layout">
                <HeaderContent></HeaderContent>
                <Content
                    style={{
                        margin: '24px 16px',
                        // padding: 24,
                        minHeight: 280,
                        position: "relative"
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout >
    );
};

export default LayoutContainer;
