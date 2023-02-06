import React, { useEffect } from 'react';

import { Layout, theme } from 'antd';
const { Header } = Layout;
import HeaderRight from './HeaderRight';
import HeaderLeft from './HeaderLeft';
import SvgIcon from '@/components/SvgIcon';
import './index.scss';

export default function HeaderContent(props: any) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header className='header-container' style={{
            padding: '0 30', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
            <div className='header-left'>
                <SvgIcon name='logo' iconStyle={{ width: 60, height: 60, minWidth: 60, minHeight: 60, cursor: "pointer" }}></SvgIcon>
                <HeaderLeft />
            </div>
            <div className="header-right">
                <HeaderRight />
            </div>
        </Header >
    )
}