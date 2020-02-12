import React from 'react';

import './Header.css';

const Header: React.FC = () => {
    return (
        <div className='header'>
            <span>问卷</span>
            <ul className="navigater">
                <li className="navi-home"><a href="#/home">首页</a></li>
                <li className="navi-create"><a href="#/create">问卷新建</a></li>
                <li className="navi-fill"><a href="#/fill">问卷填写</a></li>
                <li className="navi-data"><a href="#/data">问卷数据</a></li>
                <li className="navi-list"><a href="#/list">问卷列表</a></li>
            </ul>
        </div>
    )
}

export default Header;