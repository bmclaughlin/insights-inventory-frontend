import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';
import { INVENTORY_ROOT } from './config';
import { registry as registryDecorator, routerParams } from '@red-hat-insights/insights-frontend-components';
import { reducers } from './store';
import { NotificationsPortal } from '@red-hat-insights/insights-frontend-components/components/Notifications';

@registryDecorator()
class App extends Component {
    constructor(props) {
        super(props);
        this.getRegistry().register(reducers);
    }

    componentDidMount () {
        insights.chrome.init();
        insights.chrome.identifyApp(INVENTORY_ROOT);
        this.appNav = insights.chrome.on('APP_NAVIGATION', event => this.props.history.push(`/${event.navId}`));
    }

    componentWillUnmount() {
        this.appNav();
    }

    render () {
        return (
            <React.Fragment>
                <NotificationsPortal />
                <Routes childProps={this.props} />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

/**
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default routerParams(connect()(App));
