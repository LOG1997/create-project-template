import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

import './index.scss';
export default function Layout() {
    return (
        <div>
            <div className="header-container w-full h-14 flex justify-center fixed shadow-xl bg-light-100">
                <Header></Header>
            </div>
            <div className='content-container mt-14 flex justify-center'>
                <main className="content-main w-1200px h-calc(100vh - 60px)">
                    <Outlet />
                </main>
            </div>
            <div className='Footer w-full min-h-16 bg-dark-100'>
                <Footer></Footer>
            </div>
        </div>
    );
}
