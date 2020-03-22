import React, { Component, useContext, useEffect, Context, SFC } from 'react';
import { view as List } from './list';
import { view as Task, reducer as a } from './task';
import { view as Content } from './content';
import { Layout } from 'antd';
import { totalContext } from './Store';
import { UseContext, ClearSelected } from './interface';
import { thingSelected } from './list/actions';

const TodoApp: React.SFC = () => {
    const { state, dispatch } = useContext<UseContext>(totalContext);

    const clearSelected: ClearSelected = (event, value) => {
        if ((event.target as HTMLDivElement).className === 'list' || (event.target as HTMLDivElement).id === 'list') {
            dispatch(thingSelected(value));
        }
    }


    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
        return () => {
            localStorage.setItem('state', JSON.stringify(state));
        }
    });
    return (
        <div className='div1' >
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Header style={{ backgroundColor: 'white', borderBottom: '1px solid #f0f0f0' }}>To do list</Layout.Header>
                <Layout style={{ backgroundColor: 'white' }}>
                    <Layout.Sider theme='light' style={{ borderRight: '1px solid #f0f0f0' }} onClick={(event) => clearSelected(event, null)}>
                        <List />
                    </Layout.Sider>
                    <Layout.Sider theme='light' width='auto' style={{ borderRight: '1px solid #f0f0f0' }}>
                        <Task />
                    </Layout.Sider>
                    <Layout.Content style={{ position: 'relative' }}>
                        <Content />
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    );
    /*
    componentDidMount() {
        localStorage.setItem('state', JSON.stringify(this.props.prop));
    }
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.props.prop));
    }
    */
}
export default TodoApp;
/*
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state
    }
}
export default connect(mapStateToProps)(TodoApp);
*/
