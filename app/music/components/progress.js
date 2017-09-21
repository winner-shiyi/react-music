import React from 'react';
import './progress.less';
// state 组件本身数据
// props 接收外层传入的数据


export default class Progress extends React.Component { 
    // 这种方法只能only supported for classes created using React.createClass
    // getDefaultProps() { 
    //     return {
    //         barColor: '#2f9842'
    //     }
    // }
    changeProgress(e) {
        let progressBar = this.refs.progressBar;// 原生的dom节点
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }
    render() {
        return (
            <div className="row components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={{ width: `${this.props.progress}%`,background:this.props.barColor}}></div>
        	</div>
        );
    }
}
Progress.defaultProps = { // 进度条颜色，设置默认值，可以在父组件中传入自己喜欢的颜色
    barColor: '#2f9842'
}