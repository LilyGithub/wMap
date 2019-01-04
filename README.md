
功能介绍：这是一个基于wMap的deom，内部包含wMap组件代码。

项目启动：

在项目目录下依次执行
 npm install
 npm run dev


wMap 使用简介（具体可参考使用帮助手册）

 名称：WMap
 版本：v1.0
 功能介绍：提供一个2维地图坐标系，可以在地图内部实现添加元素，图层，移动，缩放等地图功能。可满足简单的2维地图开发。（暂未引入地理坐标系，瓦片层级，点线面操作。后续可以考虑）

使用介绍
   WMap
   引入WMap-build.js 通过新建WMap对象来引入一个地图，props为传入的object对象属性。

   var wmap = new WMap(props);

   同时提供react组件，可通过，如下示例来挂载组件：

   import WMap, {Mark,Layer,Text,Bubble} from './js/react-wMap/wMap.js';

   render() {
           return (
               <WMap width={document.body.clientWidth} height={document.body.clientHeight} virtualHeight="1000" virtualWidth="1000" oy="931" fps="10" minZoom="10" maxZoom="1000" onload={this.onload} />
           );
   }

   属性
   WMap及所有类（Mark，Layer等）内的构造函数会接收所有的属性，包括自定义的属性。
   width 
   可视区域宽（网页中dom节点的实际宽度）
   height
   可视区域高（网页中dom节点的实际高度）
   virtualHeight  
   地图坐标系最大Y，地图实际最大高度（据实际情况，自定义）

   virtualWidth
   地图坐标系最大X，地图实际最大宽度（根据实际情况，自定义）
   oy   
   地图的中心位置（在dom节点中的像素位置）
   ox
   地图的中心位置（在dom节点中的像素位置）
   mimZoom
   最小缩放值（百分比值1~正无穷）
   maxZoom 
   最大缩放值（百分比值1~正无穷）
   zoomRate
   缩放速度（百分比值1~正无穷）


   接口函数
   addElement(Element e)
   添加元素到地图中，任意元素Mark，Layer，Bubble
   car = new Mark(props);
   WMap.addElement(car);
   //添加到地图中，并渲染

   removeElement(String id) 
   根据ID删除元素
   removeElement(Element e) 
   根据元素对象删除元素
   removeElBySort(String sort) 
   根据类别删除元素
   removeElBySortAndAttr(String sort, String attr) 
   根据元素类别，某个属性值删除元素
   getElementBySort(String sort) 
   通过元素类别获取元素数组
   getElementById(String id) 
   通过元素ID获取元素
   changeScale(value) 
   改变地图比例尺
   changeScaleX(value) 
   改变地图比例尺X方向
   changeScaleY (value) 
   改变地图比例Y方向
   zoomIn()
   地图按zoomRate缩进
   zoomOut()
   地图按zoomRate放大

   事件函数
   onload 
   地图加载完成事件函数，（react组件提供，通过props绑定。 直接调用无此事件）
   click
   绑定地图点击事件
   wMap.click(function(e){
       console.info(this.ox);//this指向wMap
       console.info(e.x+","+e.y);//e为地图内的事件对象，（x,y)为地图内的事件坐标值
   });

   bindZoomEvent 
   绑定缩放事件
   //设置地图可缩放
   wMap.bindZoomEvent(true);

   //设置地图可缩放
   wMap.bindZoomEvent(true,
       function(value){ //缩放前事件
           console.info(this); //this指向wMap
           console.info(value); //value为当前缩放级别
       },
       function(value){ //缩放后事件
           console.info(this); //this指向wMap
           console.info(value); //value为当前缩放级别
       }
   );

   Mark
   不随地图比例而改变大小的标记，指定的长，宽为网页像素。
   let mark = new Mark({
               id:"mark1",
               x:300,
               y:300,
               width:65,   //px
               height:65,  //px
               Zindex:100,
               imgurl:icons.image_1,
               attr:{
                   status:0,
                   image1:icons.image_1,
                   image2:icons.image_2
               }
   });
   //添加到地图中，并会渲染
   wMap.addElement(mark);

   属性
   id 
   唯一id值，用于后续操作
   x 
   地图内的坐标x值
   y 
   地图内的坐标y值

   Width
   宽度（px）
   height 
   高度（px）
   marginLeft
   左边偏移边距（px）
   marginTop
   向上方偏移边距（px）
   Zindex 
   层级值
   img 
   图片，Image对象（优先于imgurl）
   Imgurl
   图片url

   sort
   自定义类别（字符串）
   attr
   object对象
   其他标记属性


   接口函数
   addMark
   添加伴随标记，属性&事件同Mark，x，y值会跟随宿主Mark
   let mark = new Mark(props);
   let mark2 = new Mark(props);
   mark.addMark(mark2);
   //mark2添加到mark中，mark2回跟随mark的坐标值变化

   addText
   添加文本对象
   var plateNoText = new Text({
       content:platenoStr,
       color:"#EB6700",
       font:"23px arial",
       marginLeft:dx,
       marginTop:12
   });
   car.addText(plateNoText);

   clearText()
   清空文本

   removeAllMark()
   清空所有伴随标记

   removeMarkById()
   通过ID删除伴随标记

   moveTo
   运动到指定坐标
   car.moveTo({
       x:rX,
       y:rY,
       time:60*1000,    //单位毫秒
       finish:function(){
           console.info(this.attr.plateNo);  //this指向car
       }
   });

   click()
   调用点击事件
   hover()
   调用鼠标悬停事件
   leave()
   调用鼠标离开事件
   dblClick()
   调用双击事件

   接口函数
   click(func)
   绑定点击事件
   car.click(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   hover(func)
   绑定鼠标悬停事件
   car.hover(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   leave(func)
   绑定鼠标离开事件
   car.leave(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   dblClick(func)
   绑定双击事件
   car.dbLclick(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   Layer
   地图内部图层元素，回更随地图比例尺改变大小
   属性
   id 
   唯一id值，用于后续操作
   x 
   地图内的坐标x值
   y 
   地图内的坐标y值

   Width
   宽度（地图坐标单位）
   height 
   高度（地图坐标单位）
   marginLeft
   左边偏移边距（px）
   marginTop
   向上方偏移边距（px）
   Zindex 
   层级值
   img 
   图片，Image对象（优先于imgurl）
   Imgurl
   图片url
   backgroundColor
   背景颜色，无图片时生效
   backgroundRepeat
   true或false， 背景图片是否重复平铺
   sort
   自定义类别（字符串）
   attr
   object对象
   其他标记属性


   接口函数
   addMark
   添加伴随标记，属性&事件同Mark，x，y值会跟随宿主Mark
   let mark = new Mark(props);
   let mark2 = new Mark(props);
   mark.addMark(mark2);
   //mark2添加到mark中，mark2回跟随mark的坐标值变化

   addText
   添加文本对象
   var plateNoText = new Text({
       content:platenoStr,
       color:"#EB6700",
       font:"23px arial",
       marginLeft:dx,
       marginTop:12
   });
   car.addText(plateNoText);

   clearText()
   清空文本

   removeAllMark()
   清空所有伴随标记

   removeMarkById()
   通过ID删除伴随标记

   moveTo
   运动到指定坐标
   car.moveTo({
       x:rX,
       y:rY,
       time:60*1000,    //单位毫秒
       finish:function(){
           console.info(this.attr.plateNo);  //this指向car
       }
   });

   click()
   调用点击事件
   hover()
   调用鼠标悬停事件
   leave()
   调用鼠标离开事件
   dblClick()
   调用双击事件

   接口函数
   click(func)
   绑定点击事件
   car.click(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   hover(func)
   绑定鼠标悬停事件
   car.hover(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   leave(func)
   绑定鼠标离开事件
   car.leave(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });

   dblClick(func)
   绑定双击事件
   car.dbLclick(function(){
       console.info(this.plateNo); //this指向car
       return false;  //return false阻止事件冒泡，默认不阻止。
   });



   Bubble
   地图上层的提示信息，可自定义html元素

   属性
   ox
   元素的中心点位置（像素px）
   oy
   元素的中心点位置（像素px）

   x
   元素在地图中的位置（地图坐标单位）
   y
   元素在地图中的位置（地图坐标单位）
   width:
   宽 （px）
   height
   高（px）
   content
   html标签，显示的html标签。
   Zindex
   层级值
   id
   唯一id
   Text
   文本对象，可以添加到Mark或Layer对象中

   属性
   content
   文本内容
   color
   文本颜色
   font
   文本字号和字体
   marginLeft
   左边距
   marginTop
   上边距




