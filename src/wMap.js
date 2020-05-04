import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tool } from "./Tool.js";
import { Animal } from "./Animal.js";

import Element from "./Element.js";
import Layer from "./Layer.js";
import Mark from "./Mark.js";
import Text from "./Text.js";
export {Element,Layer,Mark,Text};

window.____wMap_fps = 100;
export default class WMap extends React.Component{
    constructor(props) {
        super(props);
        let defultOption = {
            scale:100,
            defUnitx:{},
            tool:Tool,
            fps:100, //帧率
            mimZoom:10,
            maxZoom:1000,
            zoomRate:5,
            ox:0,
            oy:0
        }
        this.state = {
            text: props.initialValue || 'placeholder'
        };
        Object.assign(this,defultOption, props);
		this.elements = {};
		this.allElements = new Array();
		this.unit = {}; //比例尺
		this.oPoint = {}; //圆点
        this.buffer = new Array();
        this.realHeight = this.contentHeight = Number(this.height);
        this.realWidth = this.contentWidth = Number(this.width);
		if(this.top){
            let top = this.top.replace("px","");
            this.contentHeight = this.props.height- Math.abs(top);
        }
        if(this.left){
            let left = this.top.replace("px","");
            this.contentWidth = this.props.width - Math.abs(left);
        }
		this.play = true;
        this.unit.x = this.contentWidth/this.virtualWidth*this.scale/100;
		this.unit.y = this.contentHeight/this.virtualHeight*this.scale/100;
        this.defUnitx.x= this.realWidth/this.virtualWidth;
        this.defUnitx.y= this.realHeight/this.virtualHeight;
        ____wMap_fps = this.fps;
        this.__ox = Number(this.ox);
        this.__oy = Number(this.oy);
		
        // 绑定this
        this.setXYZfps = this.setXYZfps.bind(this);
        this.slide = this.slide.bind(this);
        this.slideTo = this.slideTo.bind(this);
        this.click = this.click.bind(this);
        this.getElementById = this.getElementById.bind(this);
        this.getElementBySort = this.getElementBySort.bind(this);
        this.addElement = this.addElement.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.removeElBySort = this.removeElBySort.bind(this);
        this.removeElBySortAndAttr = this.removeElBySortAndAttr.bind(this);
        this.getContext = this.getContext.bind(this);
        this.changeScaleX = this.changeScaleX.bind(this);
        this.changeScaleY = this.changeScaleY.bind(this);
        this.changeScale = this.changeScale.bind(this);
        this._play = this._play.bind(this);
        this.clear = this.clear.bind(this);
        this._transRealXY2XY = this._transRealXY2XY.bind(this);
        this._drawMark = this._drawMark.bind(this);
        this._drawLayer = this._drawLayer.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.bindZoomEvent = this.bindZoomEvent.bind(this);
        this.addBubble = this.addBubble.bind(this);
        this._getBubblePosition = this._getBubblePosition.bind(this);
        this._updateBubble = this._updateBubble.bind(this);
        this._transXY2RealXY = this._transXY2RealXY.bind(this);
    }
    _transRealXY2XY(pt){ //实际坐标转为网页坐标
        let unit = this.unit;
        let vP = {};
        let vx = pt.x*unit.x;
        let vy = pt.y*unit.y;
        let vw = pt.width?pt.width:0;
        let vh = pt.height?pt.height:0;
        vP.y = this.oy - vy - vh/2;
        vP.x = this.ox + vx - vw/2;
        return vP;
    };
    _transXY2RealXY(x,y){ //网页像素转实际坐标
        let unit = this.unit;
        let vP = {};
        let vy = (this.oy-y)/unit.y;
        let vx = (x-this.ox)/unit.x;
        vP.y = vy;
        vP.x = vx;
        return vP;
    };
    _transRealXYWH2XYWH(pt){ //实际坐标转为网页坐标
        let unit = this.unit;
        let vP = {};
        let vx = pt.x*unit.x;
        let vy = pt.y*unit.y;
        let vw = pt.width?pt.width*unit.x:0;
        let vh = pt.height?pt.height*unit.y:0;
        vP.y = this.oy - vy - vh/2;
        vP.x = this.ox + vx - vw/2;
        vP.w = vw;
        vP.h = vh;
        return vP;
    };
    _getBubblePosition(bb){
        let unit = this.unit;
        let vP = {};
        let vx = bb.x*unit.x;
        let vy = bb.y*unit.y;
        vP.y = this.oy - vy - bb.ox;
        vP.x = this.ox + vx - bb.oy;
        return vP;
    };
    _drawMark(mark){
        let context2d = this.context2d;
        let hpt = this._transRealXY2XY(mark);
        mark.htmlX = hpt.x + mark.marginLeft;
        mark.htmlY = hpt.y + mark.marginTop;
        if(mark.img){
            let img = mark.img;
            //img.onload = function(){
                if(mark.backgroundRepeat){
                    let imgContext = context2d.createPattern(img,"repeat");
                    context2d.fillStyle = imgContext;
                    context2d.fillRect(mark.htmlX,mark.htmlY,mark.width,mark.height);
                }else{
                    context2d.drawImage(img,mark.imgStart.x,mark.imgStart.y,img.width,img.height,mark.htmlX,mark.htmlY,mark.width,mark.height);
                }
                //文本信息
                if(mark.text){
                    for(let i=0; i<mark.text.length; i++){
                        let text = mark.text[i];
                        if(text.type == "loopText"){
                            let index = parseInt(text.loopIndex/text.loopTime);
                            index = index%text.loopTextArr.length;
                            //if(text.loopTextArr.length>1)console.log(index+","+text.loopIndex+","+text.loopTextArr.length);
                            text.content = text.loopTextArr[index];
                            
                        }
                        context2d.font = text.font;
                        context2d.textAlign = 'left';
                        context2d.textBaseline = 'top';
                        context2d.fillStyle  = text.color;
                        context2d.fillText(text.content, mark.htmlX+text.marginLeft, mark.htmlY+text.marginTop);
                    }
                }
            //}
                img = null;
        }else if(mark.backgroundColor){
            if(mark.alpha){
                context2d.globalAlpha = mark.alpha;
            }
            context2d.fillStyle = mark.backgroundColor;
            context2d.fillRect(mark.htmlX,mark.htmlY,mark.width,mark.height);
            context2d.globalAlpha = 1;
            //文本信息
            if(mark.text){
                for(let i=0; i<mark.text.length; i++){
                    let text = mark.text[i];
                    if(text.type == "loopText"){
                        let index = parseInt(text.loopIndex/text.loopTime);
                        index = index%text.loopTextArr.length;
                        //if(text.loopTextArr.length>1)console.log(index+","+text.loopIndex+","+text.loopTextArr.length);
                        text.content = text.loopTextArr[index];
                        
                    }
                    context2d.font = text.font;
                    context2d.textAlign = 'left';
                    context2d.textBaseline = 'top';
                    context2d.fillStyle  = text.color;
                    context2d.fillText(text.content, mark.htmlX+text.marginLeft, mark.htmlY+text.marginTop);
                }
            }
        }
        if(mark.marks){
            for(let m=0;m<mark.marks.length;m++){
                mark.marks[m].x = mark.x;
                mark.marks[m].y = mark.y;
                this._drawMark(mark.marks[m]);
            }
        }
        if(mark.isTrace){
            if(!this.getElementById(mark.id+mark.x+mark.y)){
                this.addMark(new Mark({
                    id:mark.id+mark.x+mark.y,
                    sort:"trace",
                    width:5,
                    height:5,
                    x:mark.x,
                    y:mark.y,
                    backgroundColor:'#00ff00'
                }));
            }
        }
        return mark;
    };

    _drawLayer(layer){
        let context2d = this.context2d;
        let unit = this.unit;
        let hpt = this._transRealXYWH2XYWH(layer);
        layer._width = hpt.w;
        layer._height = hpt.h;
        layer.htmlX = hpt.x;
        layer.htmlY = hpt.y;
        if(layer.img){
            let img = layer.img;
            //img.onload = function(){
                if(layer.backgroundRepeat){
                    let imgContext = context2d.createPattern(img,"repeat");
                    context2d.fillStyle = imgContext;
                    context2d.fillRect(layer.htmlX,layer.htmlY,layer._width,layer._height);
                }else{
                    context2d.drawImage(img,layer.imgStart.x,layer.imgStart.y,img.width,img.height,layer.htmlX,layer.htmlY,layer._width,layer._height);
                }
            //}
            img = null;
        }else if(layer.backgroundColor){
            if(layer.alpha||layer.alpha==0){
                context2d.globalAlpha = layer.alpha;
            }
            context2d.fillStyle = layer.backgroundColor;
            if(layer.shapeType&&layer.shapeType=="dotte"){
                layer.dotteNum = layer.dotteNum?layer.dotteNum:100;
                let width = layer._width/(layer.dotteNum*5);
                for(let i=0; i<layer.dotteNum; i++){
                    context2d.fillRect(layer.htmlX+(i*width*5),layer.htmlY,width*2,layer._height);
                }
            }else{
                context2d.fillRect(layer.htmlX,layer.htmlY,layer._width,layer._height);
            }
            context2d.globalAlpha = 1;
        }
        //文本信息
        if(layer.text){
            for(let i=0; i<layer.text.length; i++){
                let text = layer.text[i];
                if(text.type == "loopText"){
                    let index = parseInt(text.loopIndex/text.loopTime);
                    index = index%text.loopTextArr.length;
                    //if(text.loopTextArr.length>1)console.log(index+","+text.loopIndex+","+text.loopTextArr.length);
                    text.content = text.loopTextArr[index];
                    
                }
                context2d.font = text.font;
                context2d.textAlign = 'left';
                context2d.textBaseline = 'top';
                context2d.fillStyle  = text.color;
                context2d.fillText(text.content, layer.htmlX+text.marginLeft, layer.htmlY+text.marginTop);
            }
        }
        return layer;
    };
    _updateBubble(bb){
        let pos = this._getBubblePosition(bb);
        let divDom = bb.dom;
        divDom.style.left = pos.x+"px";
        divDom.style.top = pos.y+"px";
        return bb;
    }
    setXYZfps(f){
        this.fps = 1000/f;
        ____wMap_fps = this.fps;
    }
    /*
		 * 滑动x，y距离
		 */
    slide(x, y) {
        //TODO
    };
    /*
     * 滑动到指定x,y坐标
     */
    slideTo(x, y) {
        //TODO
    };
    click(func) {
        this.clickFunc = func;
    };
    bindZoomEvent(flag,func1,func2){
        this.zoomFlag= flag;
        if(func1)this.zoomBefore = func1;
        if(func2)this.zoomAfter = func2;
    };
    getElementById(id) {
        return this.elements[id];
    };
    getElementBySort(sort) {
        let elements = this.elements;
        let rArr = new Array();
        /*for(let i=0; i<allElements.length; i++){
            if(allElements[i].sort==sort){
                rArr.push(allElements[i]);
            }
        }*/
        for (let i in elements) {
            if (elements[i].sort == sort) {
                rArr.push(elements[i]);
            }
        }
        return rArr;
    };
    addElement(mark) {
        if (!mark) return;
        let elements = this.elements;
        let pt = this._transRealXY2XY(mark);
        mark.htmlX = pt.x;
        mark.htmlY = pt.y; //在网页上的坐标（canvas内）
        if (mark.id) {
            elements[mark.id] = mark;
        }
        //allElements.push(mark);
    };
    addBubble(opt){
        let defaultopt = {
            ox:0,
            oy:0,
            x:0,
            y:0,
            width:100,
            height:100,
            content:"",
            Zindex:99999,
            id:""
        };
        let pos = this._getBubblePosition(opt);
        opt.type = "bubble";
        let divbox = document.createElement("div");
        divbox.style.cssText = "height:"+opt.height+"px; width:"+opt.width+"px; top:"+pos.y+"px; left:"+pos.x+"px";
        divbox.style.position = "absolute";
        divbox.innerHTML = opt.content;
        this.boxDiv.append(divbox);
        opt.dom = divbox;
        this.elements[opt.id] = opt;
    };
    removeElement(mark) {
        let elements = this.elements;
        if (mark.id) {
            let id = mark.id;
            if (elements[mark.id] && elements[mark.id].release) elements[mark.id].release();
            delete elements[id];
            mark = null;
        } else if (elements[mark]) {
            elements[mark].release();
            delete elements[mark];
        }
    };
    removeElBySort(sort) {
        let elements = this.elements;
        for (let i in elements) {
            if (elements[i].sort == sort) {
                elements[i].release();
                delete elements[i];
            }
        }
    };
    removeElBySortAndAttr(attr) {
        let elements = this.elements;
        for (let i in elements) {
            if (elements[i].sort != SORT.VEHICLE) continue;
            if (elements[i].attr && elements[i].attr[attr.name] == attr.value) {
                elements[i].release();
                delete elements[i];
            }
        }
    };
    getContext() {
        return this.context2d;
    }

    changeScaleX(scale) {
        let _preWidth = this.contentWidth;
        this.contentWidth = this.realWidth*scale/100;
        this.unit.x = this.contentWidth/this.virtualWidth;
        this.__ox = this.ox = this.__ox + ( (_preWidth - this.contentWidth)/2 );
    };
    changeScaleY(scale) {
        let _preHeight = this.contentHeight;
        this.contentHeight = this.realHeight*scale/100;
        this.unit.y = this.contentHeight/this.virtualHeight;
        this.__oy = this.oy = this.__oy - ( (_preHeight - this.contentHeight)/2 );
    };
    changeScale(scale) {
        this.changeScaleX(scale);
        this.changeScaleY(scale);
    };
    zoomIn(){
        if(this.scale<this.minZoom){
            return;
        }
        this.scale -= this.zoomRate;
        this.changeScaleX(this.scale);
        this.changeScaleY(this.scale);
    }
    zoomOut(){
        if(this.scale>this.maxZoom){
            return;
        }
        this.scale += this.zoomRate;
        this.changeScaleX(this.scale);
        this.changeScaleY(this.scale);
    }
    _play(){
        let context2d = this.context2d;
        let elements = this.elements;
        if(!context2d)return;
        context2d.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        let sortedElementKeys = Object.keys(elements).sort(function(a, b) {
            return elements[a].Zindex - elements[b].Zindex;
        });
        for(let i=0; i<sortedElementKeys.length; i++){
            let key = sortedElementKeys[i];
            let el = elements[key];
            switch(el.type){
                case "mark":this._drawMark.call(this,el);break;
                case "layer": this._drawLayer(el);break;
                case "bubble": this._updateBubble(el);break;
            }
        }
    };
    clear(){
        this.play = false;
        this.tool._realeseObject(elements);
        this.tool._realeseObject(allElements);
        elements = null;
        allElements = null;
        this.context2d.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        this.context2d = null;
        this.tool._realeseObject(this);
        //allElements.length = 0;
    }
    componentDidMount() {
        let _thisMap = this;
        _thisMap.context2d = _thisMap.canvas.getContext("2d");
        let canvas = _thisMap.canvas;
        let elements = _thisMap.elements;
        canvas.onclick=function(e){
            let x = e.offsetX;
			let y = e.offsetY;
            var mapEvnet = _thisMap._transXY2RealXY(x,y);
            if(_thisMap.clickFunc)_thisMap.clickFunc(mapEvnet);
            let elements = _thisMap.elements;
            let unit = _thisMap.unit;
			for(let i in elements){
				let el = elements[i];
				if( el&&function(){
					if( x<(el.htmlX+el._width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el._height)){
						el.eventX = x/unit.x;
						el.eventY = el._height - y/unit.y;
						return el.click?el.click()==false:false;
					}
					return false;
				}() ) return;
            }
        };
        canvas.onmousedown = function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            _thisMap.__enableMove = {x:x,y:y};

        }
        canvas.onmouseup = function(e){
            if( _thisMap.__enableMove ){
                _thisMap.__ox =  Number(_thisMap.ox);
                _thisMap.__oy =  Number(_thisMap.oy);
                _thisMap.__enableMove = false;
            }
            
            
        }
		canvas.onmousemove = function(e){
            if(_thisMap.__enableMove){
                let x = e.offsetX;
                let y = e.offsetY;
                let dx = x - _thisMap.__enableMove.x;
                let dy = y - _thisMap.__enableMove.y;
                console.info(dx+","+dy);
                _thisMap.ox = _thisMap.__ox + dx;
                _thisMap.oy = _thisMap.__oy + dy;
                console.info( "@@@"+_thisMap.ox+","+ _thisMap.oy)
            }else{
                let x = e.offsetX;
                let y = e.offsetY;
                let elements = _thisMap.elements;
                let unit = _thisMap.unit;
                for(let i in elements){
                    let el = elements[i];
                    let hoverc = false;
                    let leavec = false;
                    if( el&&function(){
                        if( !hoverc && x<(el.htmlX+el._width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el._height)){
                            hoverc = ( el.hover()==false );  //事件冒泡。
                        }
                        //if(el.hovering)console.log(x+", "+el.htmlX);
                        if( !leavec && ( x>(el.htmlX+el._width) || x<=el.htmlX || y<=el.htmlY || y>(el.htmlY+el._height) ) ){
                            if(el.hovering) {
                                leavec = ( el.leave()==false );  //事件冒泡。
                            }
                        }
                        return hoverc&&leavec;
                    }() ) return;
                }
            }
			
		};
		canvas.ondblclick = function(e){
			let x = e.offsetX;
            let y = e.offsetY;
            let elements = _thisMap.elements;
            let unit = _thisMap.unit;
			for(let i in elements){
				let el = elements[i];
				if( el&&function(){
					if( x<(el.htmlX+el._width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el._height)){
						el.eventX = x/unit.x;
						el.eventY = el._height - y/unit.y;
						return el.dblClick()==false;  //事件冒泡。
					}
					return false;
				}() ) return;
			}
        };
        canvas.onmousewheel = function(e){
            let ev = ev || window.event;
            if(_thisMap.zoomFlag){
                let down = true; 
                down = ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;
                if(_thisMap.zoomBefore)_thisMap.zoomBefore();
                if(down){ //缩小
                    _thisMap.zoomIn();
                }else{
                    _thisMap.zoomOut();
                }  
                if(_thisMap.zoomAfter)_thisMap.zoomAfter();
            }
            if(ev.preventDefault){ 
                ev.preventDefault(); 
            }
        }
        this.onload.call(this);

        this.timer = setInterval(function () {
            this._play();
        }.bind(this), this.fps);
    }

    render() {
        return (
          <div width={this.props.width+"px"} height={this.props.height+"px"} ref={el => {this.boxDiv = el}}>
            <canvas width={this.props.width} height={this.props.height} ref={el => {this.canvas = el}}></canvas>
          </div>
        );
    }
};
