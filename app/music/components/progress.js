import React from 'react';
import './progress.less';
// state 组件本身数据
// props 接收外层传入的数据

export default class Progress extends React.Component {
    render() {
        return (
            <div className="row components-progress">
                <div className="progress" style={{ width: `${this.props.progress}%` }}></div>
        	</div>
        );
    }
}