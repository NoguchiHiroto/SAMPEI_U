import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from './containers/App';

export default class StartPage extends Component {
    public render() {
        return (
            // store プロパティには、上で作成した store オブジェクトを割り当てる
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
