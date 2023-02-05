import React from 'react';
import { Layout } from 'antd';
import SvgIcon from '@/components/SvgIcon';
import "./index.scss";
import { menuList } from './menuList'
import "./index.scss"
const { Sider } = Layout;
import { useLocation } from 'react-router-dom'


export default function SiderMenu(props: any) {
    const defaultSelectedKeys: string[] = [menuList[0].key]
    const location = useLocation();

    if (location.pathname.lastIndexOf('/') !== 0) {
        defaultSelectedKeys[0] = '-1';
    }
    return (
        <Sider
            trigger={null} collapsible collapsed={props.collapsed}>
            <div className='icon-logo'>
                <SvgIcon name="logo" iconStyle={{ width: "50px", height: "50px" }} />
                {props.collapsed ? null :
                    <h2>Hood</h2>}
            </div>
        </Sider>
    )
}