import { Spin } from "antd";
import React from "react";
import "./index.scss";
import RefAutoComplete from "antd/es/auto-complete";
export default function Loading() {
    return (
        <div className="loading" >
            <Spin size="large" tip="Loading" />
        </div >
    );
}