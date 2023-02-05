import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { Layout, theme } from 'antd';
import { asyncGetUserinfo } from '@/reduce/modules/user';
import HeaderContent from './HeaderContent';
import '@/style/layout/index.scss'

const { Content } = Layout;
const LayoutContainer: React.FC = () => {
    const dispatch = useDispatch();
    dispatch(asyncGetUserinfo() as any)
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                        background: colorBgContainer,
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
