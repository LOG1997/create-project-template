import React from 'react';
import SvgIcon from '@/components/SvgIcon';
import {Button,notification} from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import {getData} from '@/api/main';
import './index.scss';

export default function index() {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement,name='Log') => {
        api.info({
          message: `Notification ${placement}`,
          description: `Hello, ${name}!`,
          placement,
        });
      };

    const fetchData = () => {
        getData({}).then((res:any) => {
            openNotification('topRight',res.data);
        });
    };

    return (
        <div className='h-full mx-auto'>
            <div className='w-full  justify-center flex'>
                <div className='flex justify-center gap-10 mt-20'>
                    <div className='logo-react h-24 cursor-pointer'>
                        <SvgIcon name='react' iconStyle={{ width: 100, height: 100 }}></SvgIcon>
                    </div>
                    <div className='logo-vite h-24 cursor-pointer'>
                        <SvgIcon name='vite' iconStyle={{ width: 100, height: 100 }}></SvgIcon>
                    </div>
                    <div className="i-logos-vue w-24 h-24"></div>
                </div>
       
            </div>
            <div className='mt-12 flex justify-center'>
            {contextHolder}
                <Button type="primary" onClick={fetchData}>
                    axios
                </Button>
            </div>
        </div >
    );
}
