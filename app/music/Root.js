import React from 'react';
import Header from './components/header';
import Player from './page/Player';
import { MUSIC_LIST }  from './config/musiclist'


export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           currentMusicItem: MUSIC_LIST[0] 
        }
    }
    // 在root 中 初始化player，保证页面切换的时候音乐不会中断
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
        
    }
    render() {
        return (
            <div>
                <Header/>
                <Player currentMusicItem={this.state.currentMusicItem}></Player>
            </div>
        )
    }
}