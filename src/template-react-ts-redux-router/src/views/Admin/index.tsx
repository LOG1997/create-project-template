import React from 'react';

import { Outlet } from 'react-router-dom';
export default function index() {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}
