import React, { Component } from 'react';
import Header from './header/Header';
import Home from './home/home';
import { view as List } from './list'
import { view as Create } from './create'
import { view as Fill } from './fill';
import { view as Data } from './data';
import { HashRouter, Route } from 'react-router-dom';
import { state } from './interface';
import { connect } from 'react-redux';


//下方route路径为'/'的组件 后面添加的 exact （exact=true）属性为只匹配当前路径
//即只有在path为'/'时匹配 '/xxxxx'等不匹配
//不加的话所有斜杠'/'后面跟的路径都会匹配 导致组件渲染重叠
class Questionnaire extends Component<state> {
    constructor(props: state) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <HashRouter>
                    <Route path='/' component={Home} exact />
                    <Route path='/home' component={Home} />
                    <Route path='/create' component={Create} />
                    <Route path='/list' component={List} />
                    <Route path='/fill' component={Fill} />
                    <Route path='/data' component={Data} />
                </HashRouter>
            </div>
        )
    }
    componentDidMount() {
        localStorage.setItem('state', JSON.stringify(this.props.prop))
    }
    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.props.prop))
    }
}

const mapStateToProps = (state: state) => {
    return {
        prop: state as state
    }
}

export default connect(mapStateToProps)(Questionnaire)