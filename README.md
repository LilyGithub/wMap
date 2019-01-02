
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
WMap 接口属性：
width：可视区域宽（网页中dom节点的实际宽度）
height：可视区域高（网页中dom节点的实际高度）
virtualHeight：地图坐标系最大Y，地图实际最大高度（据实际情况，自定义）
virtualWidth：地图坐标系最大X，地图实际最大宽度（根据实际情况，自定义）
oy：地图的中心位置（在dom节点中的像素位置）
ox: 地图的中心位置（在dom节点中的像素位置）
mimZoom: 最小缩放值（百分比值）
maxZoom：最大缩放值（百分比值）
zoomRate：缩放速度（百分比值）

接口函数
addElement(Element e) 添加元素到地图中，任意元素Mark，Layer，Bubble
removeElement(String id) 根据ID删除元素
removeElement(Element e) 根据元素对象删除元素
removeElBySort(String sort) 根据类别删除元素
removeElBySortAndAttr(String sort, String attr) 根据元素类别，某个属性值删除元素
getElementBySort(String sort) 通过元素类别获取元素数组
getElementById(String id) 通过元素ID获取元素
changeScale(value) 改变地图比例尺
changeScaleX(value) 改变地图比例尺X方向
changeScaleY (value) 改变地图比例Y方向
zoomIn() 地图按zoomRate缩进
zoomOut() 地图zoomRate放大
addBubble(Bubble) 添加气泡框，Bubble气泡框对象，见Bubble

事件函数
onload：地图加载完成事件函数
click：地图点击事件
bindZoomEvent(flag,func1,func2) 绑定缩放事件，flag是否开启缩放，func1缩放前事件，func2缩放后事件


地图中添加mark
        let mark = new Mark({
            id:"mark1",
            x:5,
            y:5,
            width:50,
            height:50,
            Zindex:100,
            imgurl:image_box
        });
        wMap.addElement(mark);
Mark属性
id：唯一id值，用于后续操作
x：坐标x值，对应地图的坐标系
y：坐标y值，对应地图的坐标系
width: 宽度（px）
height：高度（px）
Zindex：层级值
img：图片，Image对象（优先于imgurl）
imgurl：图片url

接口函数：
addMark(Mark mark) 添加伴随标记，属性&事件同Mark，x，y值会跟随宿主Mark
addText(Text text) 添加文本对象
clearText() 清空文本
removeAllMark() 清空所有伴随标记
removeMarkById() 通过ID删除伴随标记
moveTo({
    x: 移动到x
    y：移动到y
    time: 移动时间（毫秒）
    finish：动画完成回调函数
}) 移动到（x,y)
click(); 调用点击事件
hover(); 调用鼠标悬停事件
leave(); 调用鼠标离开事件
dblClick(); 调用双击事件

事件函数
click(func); 绑定点击事件
hover(func); 绑定鼠标悬停事件
leave(func); 绑定鼠标离开事件
dblClick(func); 绑定双击事件
地图中添加layer



联系QQ: 1027798947 如有问题欢迎骚扰
