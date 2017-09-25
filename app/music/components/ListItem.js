import React from 'react';
import './ListItem.less';
import Pubsub from 'pubsub-js'; // 事件订阅的管理器

export default class ListItem extends React.Component {
    playMusic(musicItem) {
        // 发一个事件出去即可
        Pubsub.publish('PLAY_MUSIC', musicItem);
    }
    deleteMusic(musicItem, e) {
        // 点击删除按钮的时候，由于事件的冒泡，会把点击事件传递到li上
        e.stopPropagation();
        // 发一个事件出去即可
        Pubsub.publish('DELETE_MUSIC', musicItem);
       

    }
    render() {
        const musicItem =  this.props.musicItem;

        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-listitem row${this.props.focus ? ' focus': ''}`}>
                <p><strong>{musicItem.title} - {musicItem.artist}</strong></p>
                <p className="-col-auto delete" onClick={this.deleteMusic.bind(this, musicItem)}></p>
            </li>
        )
    }
};