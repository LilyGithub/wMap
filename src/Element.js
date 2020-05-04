import {Animal} from "./Animal.js";
export default class Element{
    constructor(props){
        let defultOption = {
            type:"element",
            marginTop:0,
            marginLeft:0,
            width:1,
            height:1,
            Zindex:0,
            sort:"",
            attr:{}
        };
        Object.assign(this,defultOption, props);

        this.moveTo = this.moveTo.bind(this);
        this.click = this.click.bind(this);
        this.hover = this.hover.bind(this);
        this.leave = this.leave.bind(this);
        this.dblClick = this.dblClick.bind(this);
        this.release = this.release.bind(this);
    }

    moveTo(options){
        if(this.runing){
            this.animal.waiter = {};
            this.animal.waiter.reLoad = function(animal){
                animal.times = options.time/____wMap_fps;
                var dx = options.x - animal.performer.x;
                var dy = options.y - animal.performer.y;
                animal.performer.px = (dx/options.time)*____wMap_fps;
                animal.performer.py = (dy/options.time)*____wMap_fps;
                animal.waiter = false;
                animal.finish = options.finish;
                animal.start();
            }
        }else{
            this.runing = true;
            var dx = options.x - this.x;
            var dy = options.y - this.y;
            this.px = (dx/options.time)*____wMap_fps;
            this.py = (dy/options.time)*____wMap_fps;//动画fps 1000/60
            this.animal = new Animal(this);
            this.animal.performer = this;
            this.animal.times = options.time/____wMap_fps;
            this.animal.finish = options.finish;
            this.animal.start();
        }
    }
    click(func){
        if(func){
            this._click = func;return true;
        }else{
            if(this._click)return this._click.call(this);
        }
    };
    hover(func){
        if(func){
            this._hover = func;return true;
        }else{
            if(this._hover){
                this.hovering = true;
                return this._hover.call(this);
            }
        }
    };
    leave(func){
        if(func){
            this._leave = func;return true;
        }else{
            if(this._leave){
                this.hovering = false;
                return this._leave.call(this);
            }
        }
    };
    dblClick(func){
        if(func){
            this._dblClick = func;return true;
        }else{
            if(this._dblClick)return this._dblClick.call(this);
        }
    };
    release(){
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
}
