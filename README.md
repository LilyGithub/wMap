# wMap

功能介绍：这是一个基于wMap的deom
wMap基于canvas提供一个2维地图坐标系，可以在地图内部实现添加元素，图层，移动，缩放等地图功能。

项目启动：

在项目目录下依次执行
 npm install
 npm run dev


wMap API：

WMap：地图类
通过new WMap() 

或 react 通过

render() {
        return (
            <WMap width={document.body.clientWidth} height={document.body.clientHeight} virtualHeight="100" virtualWidth="100" oy="1000" fps="10" onload={this.onload} />
        );
}
来新建一个地图



联系QQ: 1027798947 如有问题欢迎骚扰
