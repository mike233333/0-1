import React, { useEffect, useRef } from 'react';

import './Header.css';
import { Menu } from 'antd';
const listener = () => {
    switch (window.location.hash) {
        case '#/home': {
            (document.getElementsByClassName('menuSelect')[0] as HTMLElement).click();
        }
            break;
        case '#/create': {
            (document.getElementsByClassName('menuSelect')[1] as HTMLElement).click();
        }
            break;
        case '#/fill': {
            (document.getElementsByClassName('menuSelect')[2] as HTMLElement).click();
        }
            break;
        case '#/data': {
            (document.getElementsByClassName('menuSelect')[3] as HTMLElement).click();
        }
            break;
        case '#/list': {
            (document.getElementsByClassName('menuSelect')[4] as HTMLElement).click();
        }
            break;
    }
}
window.addEventListener('hashchange', listener);

const Header: React.FC = () => {
    return (
        <Menu mode='horizontal' className='headerMenu'>
            <Menu.Item className='menuSelect' onClick={() => { window.location.hash = '/home' }}>首页</Menu.Item>
            <Menu.Item className='menuSelect' onClick={() => { window.location.hash = '/create' }}>问卷新建</Menu.Item>
            <Menu.Item className='menuSelect'>问卷填写</Menu.Item>
            <Menu.Item className='menuSelect'>问卷数据</Menu.Item>
            <Menu.Item className='menuSelect' onClick={() => { window.location.hash = '/list' }}>问卷列表</Menu.Item>
        </Menu>
    )
}

export default Header;