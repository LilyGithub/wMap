
export const Animal = function(m){ 4
    this.mark = m;
    this.start = function(){
        let mark = this.mark;
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
        let animal = this;
        /*img.onload = function(){*/
            if(animal.times>0){
                setTimeout(function(){
                    if(animal.start){
                        animal.start();
                    }
                    animal = null;
                    mark = null;
                },____wMap_fps);
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
