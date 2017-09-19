import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; //react 热更新
import Root from './Root';


render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) { // 按照这个模板使用热更新
    module.hot.accept('./Root', () => {
        const NewRoot = require('./Root').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
