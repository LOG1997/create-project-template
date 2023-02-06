import React, { useState } from 'react'
import { Menu } from 'antd';
import { navList } from './config';
export default function HeaderLeft() {
    const [current, setCurrent] = useState('mail');

    return (
        <Menu className='topMenu' style={{ width: "100%" }} selectedKeys={[current]} mode="horizontal" items={navList} />

    )
}
