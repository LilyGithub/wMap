class Element{
    constructor(props){
        super(props);
    }

    moveTo = function(options){
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
    click = function(func){
        if(func){
            this._click = func;return true;
        }else{
            if(this._click)return this._click.call(this);
        }
    };
    hover = function(func){
        if(func){
            this._hover = func;return true;
        }else{
            if(this._hover){
                this.hovering = true;
                return this._hover.call(this);
            }
        }
    };
    leave = function(func){
        if(func){
            this._leave = func;return true;
        }else{
            if(this._leave){
                this.hovering = false;
                return this._leave.call(this);
            }
        }
    };
    dblClick = function(func){
        if(func){
            this._dblClick = func;return true;
        }else{
            if(this._dblClick)return this._dblClick.call(this);
        }
    };
    release = function(){
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
