import React from 'react';
import ListItem from '../components/ListItem';


export default class List extends React.Component {

    render() {
        let listEle = this.props.musicList.map((item) => {
            return (
                <ListItem 
                    key={item.id}
                    musicItem={item}
                    focus={item === this.props.currentMusicItem}
                >{item.title}</ListItem>
            );
        });

        return (
            <ul>
                { listEle }
            </ul>
        )
    }
};