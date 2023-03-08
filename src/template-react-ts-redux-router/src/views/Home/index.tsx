import React from 'react'
import SvgIcon from '@/components/SvgIcon'

import './index.scss'
export default function index() {
    return (
        <div className='h-full'>
            <div className='w-full h-full justify-center flex bg-dark-200'>
                <div className='flex justify-center gap-10 mt-20'>
                    <div className='logo-react cursor-pointer'>
                        <SvgIcon name='react' iconStyle={{ width: 100, height: 100 }}></SvgIcon>
                    </div>
                    <div className='logo-vite cursor-pointer'>
                        <SvgIcon name='vite' iconStyle={{ width: 100, height: 100 }}></SvgIcon>
                    </div>
                </div>
            </div>
        </div >
    )
}
