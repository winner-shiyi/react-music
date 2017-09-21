import React from 'react';
import Header from './components/header';
import Progress from './components/Progress';

let duration = null; // 当前音频的总时间
export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:'-',
        }
    }
    componentDidMount() {
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration; // 获取总时长
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute)
            });
        });
    }
    // 不会有重复绑定的问题
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer('play', duration * progress);
    }
    render() {
        return (
            <div>
                <Header></Header>
                <Progress 
                progress={this.state.progress}
                onProgressChange={this.progressChangeHandler.bind(this)}
                barColor="#ca71da"
                ></Progress>
            </div>
            
        );
    }
}