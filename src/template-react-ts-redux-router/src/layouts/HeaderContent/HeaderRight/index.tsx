import React, { useState } from 'react'
import SvgIcon from '@/components/SvgIcon'
import { Avatar, Dropdown, Space, Divider, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import { fullscreen, setFullscreen } from '@/reduce/modules/setting';
import { useSelector, useDispatch } from 'react-redux'
import { userInfo } from '@/reduce/modules/user'
import { roleAuth } from '@/config/role';
import './index.scss'

export default function HeaderRight() {
    const dispatch = useDispatch();
    const [isFullscreen, setIsFullscreen] = useState(useSelector(fullscreen));
    const handleFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
        dispatch(setFullscreen(!isFullscreen));
    }
    const { useToken } = theme;
    const user = useSelector(userInfo);

    const { token } = useToken();

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        marginTop: "10px",
    };


    const [open, setOpen] = useState(false);
    const handleMenuClick = () => {
        setOpen(false);
    };
    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    return (
        <div className='header-right-container'>
            <div style={{ width: 35, height: 35, cursor: "pointer" }}>
                <SvgIcon name='setting' iconStyle={{ width: 35, height: 35, cursor: "pointer" }}></SvgIcon>
            </div>
            <div onClick={handleFullScreen} style={{ width: 35, height: 35, cursor: "pointer" }}>
                <SvgIcon name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'} iconStyle={{ width: 35, height: 35, cursor: "pointer" }} ></SvgIcon>
            </div>
            <Dropdown

                onOpenChange={handleOpenChange}
                open={open}
                dropdownRender={() => (
                    <div style={contentStyle} >
                        <div>
                            <div className="user-item" onClick={handleMenuClick}>
                                <SvgIcon name="user" iconStyle={{ width: 24, height: 24, cursor: "pointer", marginRight: 10 }} ></SvgIcon>
                                <span>{user.userInfo.user_nickname}</span>
                            </div>
                            <div className="user-item" onClick={handleMenuClick}>
                                <SvgIcon name="auth" iconStyle={{ width: 24, height: 24, cursor: "pointer", marginRight: 10 }} ></SvgIcon>
                                <span>{roleAuth[user.userInfo.user_role * 1]}</span>
                            </div>
                            <div className="user-item" onClick={handleMenuClick}>
                                <SvgIcon name="exit" iconStyle={{ width: 24, height: 24, cursor: "pointer", marginRight: 10, color: "red" }} ></SvgIcon>
                                <span>退出登录</span>
                            </div>
                        </div>
                        <Divider style={{ margin: 0 }} />
                    </div>
                )
                }
            >
                <Avatar src={user.userInfo.user_avatar} style={{ cursor: "pointer", marginBottom: "-7px" }} ></Avatar>
            </Dropdown >
        </div >
    )
}
