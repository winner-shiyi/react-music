import React from 'react';
import { Link } from 'react-router';
import Progress from '../components/Progress';
import './player.less';


let duration = null; // 当前音频的总时间
export default class Play extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            leftTime: '',
            volume: 0,
            isPlay: true
        }
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration; // 获取总时长
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
                volume: e.jPlayer.options.volume *100
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
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }
    play() {
        if (this.state.isPlay) {
            $('#palyer').jPlayer('pause');
        } else {
            $('#palyer').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    prev() {

    }
    next() {

    }
    render() { 
        const {
            title,
            artist,
            cover,
        } = this.props.currentMusicItem
        
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{title}</h2>
                		<h3 className="music-artist mt10">{artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-2:00</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                 <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler.bind(this)}
										barColor='#aaa'
					                >
					                </Progress> 
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
                             <Progress 
                                progress={this.state.progress}
                                onProgressChange={this.progressChangeHandler.bind(this)}
                                barColor="#ca71da"
                            ></Progress> 
                		</div>
                		<div className="mt35 row">
                			 <div>
	                			<i className="icon prev" onClick={this.prev.bind(this)}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
	                			<i className="icon next ml20" onClick={this.next.bind(this)}></i>
                			</div> 
                			<div className="-col-auto">
                				{/* <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i> */}
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">	
                        <img src={cover} alt={title}/>
                	</div>
                </div>
            </div>    
        );
    }
};