import React from 'react';
import { Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router';
import Header from './components/header';
import Player from './page/Player';
import { MUSIC_LIST }  from './config/musiclist';
import List from './page/list';
import Pubsub from 'pubsub-js'; // 事件订阅的管理器
import { randomRange } from './utils/util';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: {},
            repeatType: 'cycle' 
        }
    }
    // 在root 中 初始化player，保证页面切换的时候音乐不会中断
    componentDidMount() {
        // 初始化音乐播放器
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        // 调用音乐播放器
        this.playMusic(this.state.musicList[0]);

        // 监听当前音乐播放进度，播放完毕之后需要事件回调
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });

        // 设置一个订阅器
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => { //msg 是pubsub传过来的消息参数，第二个参数是我们传入的参数
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            });
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });

        Pubsub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });

        const repeatList = [
            'cycle',
            'once',
            'random'
        ];
        Pubsub.subscribe('CHANAGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
    }
    componentWillUnMount() {
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('CHANAGE_REPEAT');
        $('#player').unbind($.jPlayer.event.ended);
    }
    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusicItem);
            let randomIndex = randomRange(0, this.state.musicList.length - 1);
            while(randomIndex === index) {
               randomIndex = randomRange(0, this.state.musicList.length - 1); 
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusicItem);
        } else {
            this.playNext();
        }
    }
    // 把音乐播放的逻辑单独拎出来，可以多处复用
    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        });
    }
    playNext(type = 'next') {
        const index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        const musicListLength = this.state.musicList.length;
        if (type === 'next') { 
            // index + 1 ，特殊情况，如果当前已经是数组中最后一项，就会造成数组溢出
            newIndex = (index + 1) % musicListLength;
        } else {
            // 如果当前index 为0 ，会出现负数
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }
    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    }
    render() {
        return (
            <div>
                <Header/>
                {/* <List
                    currentMusicItem={this.state.currentMusicItem}
                    musiclist={this.state.musiclist}
                ></List> */}
                {
                    React.cloneElement(this.props.children, this.state) // 根据路由切换，渲染List 或者 Player
                }
            </div>
        )
    }
};

export default class Root extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={List}></Route>
                </Route>
            </Router>  
        )
    }
};