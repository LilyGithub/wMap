
功能介绍：这是一个基于wMap的deom，内部包含wMap组件代码。

项目启动：

在项目目录下依次执行
 npm install
 npm run dev


wMap 使用简介（具体可参考使用帮助手册）

 名称：WMap
 
 版本：v1.0
 
 功能介绍：提供一个2维地图坐标系，可以在地图内部实现添加元素，图层，移动，缩放等地图功能。可满足简单的2维地图开发。（暂未引入地理坐标系，瓦片层级，点线面操作。后续可以考虑）


使用
   引入WMap-build.js 通过新建WMap对象来引入一个地图，props为传入的object对象属性。

   var wmap = new WMap(props);

   同时提供react组件，可通过，如下示例来挂载组件：

   import WMap, {Mark,Layer,Text,Bubble} from './js/react-wMap/wMap.js';

   render() {
           return (
               <WMap width={document.body.clientWidth} height={document.body.clientHeight} virtualHeight="1000" virtualWidth="1000" oy="931" fps="10" minZoom="10" maxZoom="1000" onload={this.onload} />
           );
   }

 
