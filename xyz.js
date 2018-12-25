
(function(a){
	var fps = 1000/15; //动画fps（1/n 1秒n帧）
	a.setXYZfps = function(f){
		fps = 1000/f;
	}
	a._requestAnimFrame = 
          function( callback ){
            a.setTimeout(callback, fps);
          };
    a._realeseObject = function(obj){
    	for(var i in obj){
    		obj[i] = null;
    	}
    	obj = null;
    }
	var _moveRun = function(m){
		this.mark = m;
		this.start = function(){
			var mark = this.mark;
			if(!mark){
				return;
			}
			if(this.waiter){ //有等待执行的动画。立即停止真正执行的动画，平滑过渡
				this.finish&&this.finish(mark);
				this.waiter.reLoad(this);
				return;
			}
			mark.x = mark.x + mark.px;
			mark.y = mark.y + mark.py;
			/*var img = new Image();
			img.src = mark.img;*/
			this.times--;
			var animal = this;
			/*img.onload = function(){*/
				if(animal.times>0){
					_requestAnimFrame(function(){
						if(animal.start){
							animal.start();
						}
						animal = null;
						mark = null;
					});
				}else{
					mark.runing = false;
					animal.finish&&animal.finish(mark);
					animal.mark = null;
					animal = null;
					mark = null;
				}
			/*}*/
		};
	};
	
	a.Element = function(){
		this.moveTo = function(options){
			if(this.runing){
				this.animal.waiter = {};
				this.animal.waiter.reLoad = function(animal){
					animal.times = options.time/fps;
					var dx = options.x - animal.performer.x;
					var dy = options.y - animal.performer.y;
					animal.performer.px = (dx/options.time)*fps;
					animal.performer.py = (dy/options.time)*fps;
					animal.waiter = false;
					animal.finish = options.finish;
					animal.start();
				}
			}else{
				this.runing = true;
				var dx = options.x - this.x;
				var dy = options.y - this.y;
				this.px = (dx/options.time)*fps;
				this.py = (dy/options.time)*fps;//动画fps 1000/60
				this.animal = new _moveRun(this);
				this.animal.performer = this;
				this.animal.times = options.time/fps;
				this.animal.finish = options.finish;
				this.animal.start();
			}
		}
		this.click = function(func){
			if(func){
				this._click = func;return true;
			}else{
				if(this._click)return this._click.call(this);
			}
		};
		this.hover = function(func){
			if(func){
				this._hover = func;return true;
			}else{
				if(this._hover){
					this.hovering = true;
					return this._hover.call(this);
				}
			}
		};
		this.leave = function(func){
			if(func){
				this._leave = func;return true;
			}else{
				if(this._leave){
					this.hovering = false;
					return this._leave.call(this);
				}
			}
		};
		this.dblClick = function(func){
			if(func){
				this._dblClick = func;return true;
			}else{
				if(this._dblClick)return this._dblClick.call(this);
			}
		};
		this.release = function(){
			var mk = this;
			if(mk&&mk.animal){
				for(var i in mk.animal){
					mk.animal[i] = null;
				}
			}
			if(mk){
				for(var i in mk){
					mk[i] = null;
		    	}
				mk = null;
			}
		};
	};
	a.Mark = function(options){
		this.type = "mark";
		this.sort = options.sort;
		this.backgroundRepeat = options.backgroundRepeat;
		this.backgroundColor = options.backgroundColor;
		if(options.imgStart){
			this.imgStart = options.imgStart;
		}else{
			this.imgStart = {
					x:0,
					y:0
			};
		}
		this.alpha = options.alpha;
		this.x = options.x;
		this.y = options.y;
		this.marginLeft = options.marginLeft?options.marginLeft:0;
		this.marginTop = options.marginTop?options.marginTop:0;
		this.width = options.width;
		this.height = options.height;
		this.img = options.img;
		this.isTrace = options.isTrace;
		this.attr = options.attr;
		if(!this.attr)this.attr = {};
		if(options.id){
			this.id = options.id;
		};
		this.addText = function(text){
			if(!this.text){
				this.text = new Array();
			}
			if(Object.prototype.toString.call(text) === '[object Array]'){
				for(var i=0; i<text.length; i++){
					this.text.push(text[i]);
				}
			}else{
				this.text.push(text);
			}
		};
		this.clearText = function(){
			if(this.text){
				this.text.splice(0,this.text.length);
			}
		};
		this.getText = function(textId){
			if(!this.text){
				return false;
			}
			for(var i=0; i<this.text.length; i++){
				if(this.text[i].id == textId){
					return this.text[i];
				}
			}
		};
		this.addMark = function(mark){
			if(!this.marks){
				this.marks = new Array();
			}
			if(Object.prototype.toString.call(mark) === '[object Array]'){
				for(var i=0; i<mark.length; i++){
					this.marks.push(mark[i]);
				}
			}else{
				this.marks.push(mark);
			}
		};
		this.removeMarkBySort = function(sort){
			if(!this.marks)return;
			for(var i=0; i<this.marks.length; i++){
				if(this.marks[i].sort==sort){
					this.marks[i].release();
					this.marks[i] = null;
					this.marks.splice(i, 1);
				}
			}
		}
		Element.call(this);
	};
	a.Layer = function(options){
		this.type = "layer";
		this.sort = options.sort;
		this.backgroundRepeat = options.backgroundRepeat;
		this.backgroundColor = options.backgroundColor;
		if(options.imgStart){
			this.imgStart = options.imgStart;
		}else{
			this.imgStart = {
					x:0,
					y:0
			};
		}
		this.alpha = options.alpha;
		this.x = options.x;
		this.y = options.y;
		this.lwidth = options.lwidth;
		this.lheight = options.lheight;
		this.width = options.lwidth;
		this.height = options.lheight;
		this.img = options.img;
		this.shapeType = options.shapeType;
		this.dotteNum = options.dotteNum;
		this.attr = options.attr;
		if(options.id){
			this.id = options.id;
		}
		this.addText = function(text){
			if(!this.text){
				this.text = new Array();
			}
			if(Object.prototype.toString.call(text) === '[object Array]'){
				for(var i=0; i<text.length; i++){
					this.text.push(text[i]);
				}
			}else{
				this.text.push(text);
			}
		};
		Element.call(this);
	};
	a.Text = function(options){
		this.type = "text";
		this.content = options.content;
		this.font = options.font;
		this.sort = options.sort;
		this.color = options.color;
		this.fontSize = options.fontSize;
		this.marginLeft = options.marginLeft;
		this.marginTop = options.marginTop;
		this.width = options.width;
		this.height = options.height;
		this.attr = options.attr;
		if(options.id){
			this.id = options.id;
		}
		Element.call(this);
	};
	a.LoopText = function(options){
		this.loopTime = options.loopTime;
		this.loopTextArr = options.loopTextArr;
		this.loopIndex = options.loopIndex;
		Text.call(this,options);
		this.type = "loopText";
		this.addText = function(text){
			if(!this.loopTextArr){
				this.loopTextArr = new Array();
			}
			this.loopTextArr.push(text);
		}
	}
	a.Mark.prototype._click = function(){
		
	}
	a.XYZ = function(options){
		var xyzBox = options.box;
		var canvas = a.document.createElement("canvas");
		
		canvas.width = Number( xyzBox.style.width.replace("px","") );
		canvas.height = Number( xyzBox.style.height.replace("px","") );
		
		xyzBox.appendChild(canvas);
		var context2d = canvas.getContext("2d");
		var elements = {};
		var allElements = new Array();
		var unit = {}; //比例尺
		var oPoint = {}; //圆点
		var buffer = new Array();
		var topPx = 0;
		if(options.topPx){
			topPx = options.topPx;
		}
		var length = canvas.width;
		var height = canvas.height - Math.abs(topPx);
		if(length==0&&height==0){
			var length = canvas.clientWidth;
			var height = canvas.clientHeight - Math.abs(topPx);
		}
		var play = true;
		this.length = length;
		var defLength = length;
		this.height = height;
		var clickFunc = false;
		unit.x = length/options.maxX;
		unit.y = height/options.maxY;
		var defUnitx = unit.x;
		if(options.ox&&options.oy){
			oPoint.x = options.ox;
			oPoint.y = options.oy;
		}else{
			oPoint.x = 0;
			oPoint.y = height;
		};
		this.translateX = 0;
		this.translateY = 0;
		this.translatingX = 0;
		this.translatingY = 0;
		canvas.onclick=function(e){
			if(clickFunc)clickFunc();
			var x = e.offsetX;
			var y = e.offsetY;
			for(var i in elements){
				var el = elements[i];
				if( el&&function(){
					if( x<(el.htmlX+el.width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el.height)){
						el.eventX = x/unit.x;
						el.eventY = height - y/unit.y;
						return el.click?el.click()==false:false;
					}
					return false;
				}() ) return;
			}
		};
		canvas.onmousemove = function(e){
			var x = e.offsetX;
			var y = e.offsetY;
			for(var i in elements){
				var el = elements[i];
				var hoverc = false;
				var leavec = false;
				if( el&&function(){
					if( !hoverc && x<(el.htmlX+el.width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el.height)){
						hoverc = ( el.hover()==false );  //事件冒泡。
					}
					//if(el.hovering)console.log(x+", "+el.htmlX);
					if( !leavec && ( x>(el.htmlX+el.width) || x<=el.htmlX || y<=el.htmlY || y>(el.htmlY+el.height) ) ){
						if(el.hovering) {
							leavec = ( el.leave()==false );  //事件冒泡。
						}
					}
					return hoverc&&leavec;
				}() ) return;
			}
		};
		canvas.ondblclick = function(e){
			var x = e.offsetX;
			var y = e.offsetY;
			for(var i in elements){
				var el = elements[i];
				if( el&&function(){
					if( x<(el.htmlX+el.width) && x>el.htmlX && y>el.htmlY && y<(el.htmlY+el.height)){
						el.eventX = x/unit.x;
						el.eventY = height - y/unit.y;
						return el.dblClick()==false;  //事件冒泡。
					}
					return false;
				}() ) return;
			}
		};
		/*
		 * 滑动x，y距离
		 */
		this.slide = function(x, y){
			//TODO
		};
		/*
		 * 滑动到指定x,y坐标
		 */
		this.slideTo = function(x, y){
			//TODO
		};
		this.click = function(func){
			clickFunc = func;
		};
		this.getElementById = function(id){
			return elements[id];
		};
		this.getElementBySort = function(sort){
			var rArr = new Array();
			/*for(var i=0; i<allElements.length; i++){
				if(allElements[i].sort==sort){
					rArr.push(allElements[i]);
				}
			}*/
			for(var i in elements){
				if(elements[i].sort==sort){
					rArr.push(elements[i]);
				}
			}
			return rArr;
		};
		this.addMark = function(mark){
			if(!mark)return;
			var pt = _transRealXY2XY(mark);
			mark.htmlX = pt.x;
			mark.htmlY = pt.y; //在网页上的坐标（canvas内）
			if(mark.id){
				elements[mark.id] = mark;
			}
			//allElements.push(mark);
		};
		this.removeMark = function(mark){
			/*for(var i=0; i<allElements.length; i++){
				if(allElements[i]==mark){
					allElements.splice(i, 1);
					delete mark;
				    break;
				}
			}*/
			if(mark.id){
				var id = mark.id;
				if(elements[mark.id]&&elements[mark.id].release)elements[mark.id].release();
				delete elements[id];
				mark = null;
			}else if(elements[mark]){
				elements[mark].release();
				delete elements[mark];
			}
		};
		this.removeMarkBySort = function(sort){
			/*for(var i=0; i<allElements.length; i++){
				if(allElements[i].sort==sort){
					allElements.splice(i, 1);
					i--;
				}
			}*/
			for(var i in elements){
				if(elements[i].sort==sort){
					elements[i].release();
					delete elements[i];
				}
			}
		};
		this.removeMarkBySortAndAttr = function(attr){
			/*for(var i=0; i<allElements.length; i++){
				if(allElements[i].sort!=SORT.VEHICLE)continue;
				if(allElements[i].attr&&allElements[i].attr[attr.name]==attr.value){
					allElements.splice(i, 1);
					i--;
				}
			}*/
			for(var i in elements){
				if(elements[i].sort!=SORT.VEHICLE)continue;
				if(elements[i].attr&&elements[i].attr[attr.name]==attr.value){
					elements[i].release();
					delete elements[i];
				}
			}
		};
		this.getContext = function(){
			return context2d;
		}
		
		this.changeScaleX = function(scale){
			canvas.width = defLength/(scale*defUnitx);
			unit.x = 1/scale;
			length = canvas.width;
			context2d = canvas.getContext("2d");
		};
		var _transRealXY2XY = function(pt){ //实际坐标转为网页坐标
			var vP = {};
			var vx = pt.x*unit.x;
			var vy = pt.y*unit.y;
			var vw = pt.width?pt.width:0;
			var vh = pt.height?pt.height:0;
			vP.y = oPoint.y - vy - vh/2;
			vP.x = oPoint.x + vx - vw/2;
			return vP;
		};
		var _drawMark = function(mark){
			var hpt = _transRealXY2XY(mark);
			mark.htmlX = hpt.x + mark.marginLeft;
			mark.htmlY = hpt.y + mark.marginTop;
			if(mark.img){
				var img = mark.img;
				//img.onload = function(){
					if(mark.backgroundRepeat){
						var imgContext = context2d.createPattern(img,"repeat");
						context2d.fillStyle = imgContext;
						context2d.fillRect(mark.htmlX,mark.htmlY,mark.width,mark.height);
					}else{
						context2d.drawImage(img,mark.imgStart.x,mark.imgStart.y,mark.width,mark.height,mark.htmlX,mark.htmlY,mark.width,mark.height);
					}
					//文本信息
					if(mark.text){
						for(var i=0; i<mark.text.length; i++){
							var text = mark.text[i];
							if(text.type == "loopText"){
								var index = parseInt(text.loopIndex/text.loopTime);
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
					for(var i=0; i<mark.text.length; i++){
						var text = mark.text[i];
						if(text.type == "loopText"){
							var index = parseInt(text.loopIndex/text.loopTime);
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
				for(var m=0;m<mark.marks.length;m++){
					mark.marks[m].x = mark.x;
					mark.marks[m].y = mark.y;
					_drawMark(mark.marks[m]);
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
		var _drawLayer = function(layer){
			layer.width = layer.lwidth*unit.x;
			layer.height = layer.lheight*unit.y;
			var hpt = _transRealXY2XY(layer);
			layer.htmlX = hpt.x;
			layer.htmlY = hpt.y;
			if(layer.img){
				var img = layer.img;
				//img.onload = function(){
					if(layer.backgroundRepeat){
						var imgContext = context2d.createPattern(img,"repeat");
						context2d.fillStyle = imgContext;
						context2d.fillRect(layer.htmlX,layer.htmlY,layer.width,layer.height);
					}else{
						context2d.drawImage(img,layer.imgStart.x,layer.imgStart.y,layer.width,layer.height,layer.htmlX,layer.htmlY,layer.width,layer.height);
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
					var width = layer.width/(layer.dotteNum*5);
					for(var i=0; i<layer.dotteNum; i++){
						context2d.fillRect(layer.htmlX+(i*width*5),layer.htmlY,width*2,layer.height);
					}
				}else{
					context2d.fillRect(layer.htmlX,layer.htmlY,layer.width,layer.height);
				}
				context2d.globalAlpha = 1;
			}
			//文本信息
			if(layer.text){
				for(var i=0; i<layer.text.length; i++){
					var text = layer.text[i];
					if(text.type == "loopText"){
						var index = parseInt(text.loopIndex/text.loopTime);
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
		var _play = function(){
			if(!context2d)return;
			context2d.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
			for(var i in elements){
				var el = elements[i];
				switch(el.type){
					case "mark": _drawMark.call(this,el);break;
					case "layer": _drawLayer(el);break;
				}
			}
			if(play)_requestAnimFrame(_play.bind(this));
		};
		this.clear = function(){
			play = false;
			_realeseObject(elements);
			_realeseObject(allElements);
			elements = null;
			allElements = null;
			context2d.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
			context2d = null;
			_realeseObject(this);
			//allElements.length = 0;
		}
		_play.call(this);
	}
})(window);
