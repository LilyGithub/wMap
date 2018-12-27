import { DatePicker } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WMap, {Mark,Layer,Text} from './js/react-wMap/wMap.js';

let bgImage = require("./images/bg.png");

export class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    onload(){
        let wMap = this;
        let mark = new Mark({
            id:"mark1",
            x:50,
            y:50,
            width:50,
            height:50,
            backgroundColor:"#000000"
        });
        let layBgImage = new Image();
        layBgImage.src = bgImage;
        let layer = new Layer({
            id:"baseLayer",
            x:wMap.virtualWidth/2,
            y:wMap.virtualHeight/2,
            width:wMap.virtualWidth,
            height:wMap.virtualHeight,
            img:layBgImage
        });
        mark.moveTo({
            x:0,
            y:0,
            time:10000
        })
        wMap.addElement(layer);
        wMap.addElement(mark);
        wMap.bindZoomEvent(true);
    }

    render() {
        return (
            <WMap width={document.body.clientWidth} height={document.body.clientHeight} virtualHeight="100" virtualWidth="100" oy="1000" fps="10" onload={this.onload} />
        );
    }
};
