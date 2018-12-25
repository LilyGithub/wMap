import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class WMap extends React.Component{
    constructor(props) {
        super(props);
        let defultOption = {
            fps:100, //帧率
            ox:0,
            oy:0
        }
        this.state = {
            text: props.initialValue || 'placeholder'
        };
        Object.assign(this,defultOption, props);
		this.canvas = document.createElement("canvas");
		this.canvas.width = Number(  this.width.replace("px","") );
		this.canvas.height = Number( this.height.replace("px","") );
		this.context2d = canvas.getContext("2d");
		this.elements = {};
		this.allElements = new Array();
		this.unit = {}; //比例尺
		this.oPoint = {}; //圆点
        this.buffer = new Array();
        this.contentHeight = this.height;
        this.contentWidth = this.width;
		if(this.top){
            let top = this.top.replace("px","");
            this.contentHeight = canvas.height==0?canvas.clientHeight:canvas.height - Math.abs(top);
        }
        if(this.left){
            let left = this.top.replace("px","");
            this.contentWidth = canvas.width==0?canvas.clientWidth:canvas.width - Math.abs(left);
        }
		this.play = true;
        this.virtualHeight = this.contentHeight;
        this.virtualWidth = this.contentWidth;
		this.unit.x = this.virtualWidth/this.realWidth;
		this.unit.y = this.virtualHeight/this.realHeight;
        this.defUnitx.x= this.contentWidth/this.realWidth;
        this.defUnitx.y= this.contentHeight/this.realHeight;
        
		
        // 绑定this
        this.setXYZfps = this.setXYZfps.bind(this);
        this._requestAnimFrame = this._requestAnimFrame.bind(this);
    }

    setXYZfps = function(f){
		this.fps = 1000/f;
    }
    
    _requestAnimFrame = function( callback ){
        a.setTimeout(callback, fps);
    };

};
