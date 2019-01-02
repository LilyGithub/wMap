import { DatePicker } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WMap, {Mark,Layer,Text} from './js/react-wMap/wMap.js';

let bgImage = require("./images/bg.png");

let image_a1 = require("./images/a1.png");
let image_a1a = require("./images/a1a.png");
let image_a2 = require("./images/a2.png");
let image_a2a = require("./images/a2a.png");

export class App extends React.Component{
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    //初始化地图方法
    onload(){ 
        let wMap = this;

        let layBgImage = new Image();
        layBgImage.src = bgImage;
        let layer = new Layer({
            id:"baseLayer",
            x:wMap.virtualWidth/2,
            y:wMap.virtualHeight/2,
            width:1000,
            height:1000,
            img:layBgImage,
            backgroundRepeat:false
        });
        wMap.addElement(layer);
        wMap.click(function(e){
            let box = new Layer({
                id:"box"+e.x+e.y,
                x:e.x,
                y:e.y,
                width:10,
                height:20,
                Zindex:101,
                imgurl:image_a1,
                attr:{
                    status:0,
                    image1:image_a1,
                    image2:image_a1a
                }
            });
            wMap.addElement(box);
            box.click(function(){
                if(this.attr.status==0){
                    this.imgurl = this.attr.image2;
                    this.attr.status=1;
                }else{
                    this.imgurl = this.attr.image1;
                    this.attr.status=0;
                }
            });
        });

        let mark = new Mark({
            id:"mark1",
            x:5,
            y:5,
            width:50,
            height:50,
            Zindex:100,
            imgurl:image_a2,
            attr:{
                status:0,
                image1:image_a2,
                image2:image_a2a
            }
        });

        let box = new Layer({
            id:"box1",
            x:wMap.virtualWidth/2,
            y:wMap.virtualHeight/2,
            width:10,
            height:20,
            Zindex:101,
            imgurl:image_a1,
            attr:{
                status:0,
                image1:image_a1,
                image2:image_a1a
            }
        });
        wMap.addElement(mark);
        wMap.addElement(box);

        box.click(function(){
            if(this.attr.status==0){
                this.imgurl = this.attr.image2;
                this.attr.status=1;
            }else{
                this.imgurl = this.attr.image1;
                this.attr.status=0;
            }
        });
        mark.click(function(){
            if(this.attr.status==0){
                this.imgurl = this.attr.image2;
                wMap.addBubble({
                id:"bubble1",
                ox:100,
                oy:100,
                x:this.x,
                y:this.y,
                width:100,
                height:100,
                content:'<div style="width:100px;height:100px;background:#0ff"></div>'
                });
                this.attr.status=1;
            }else{
                wMap.removeElement("bubble1");
                this.imgurl = this.attr.image1;
                this.attr.status=0;
            }
            
        });
 
        //设置地图可缩放
        wMap.bindZoomEvent(true);
        
    }

    render() {
        return (
            <WMap width={document.body.clientWidth} height={document.body.clientHeight} virtualHeight="100" virtualWidth="100" oy="1000" fps="10" minZoom="10" maxZoom="1000" onload={this.onload} />
        );
    }
};
