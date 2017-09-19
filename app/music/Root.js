import React from 'react';
import Header from './components/header';
import Progress from './components/Progress';

export default class Root extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Progress progress="2"></Progress>
            </div>
            
        );
    }
}