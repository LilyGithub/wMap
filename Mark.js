import Element from "./Element.js";
export default class Mark extends Element{
    constructor(props){
        super(props);
        this.type = "mark";
        if(!this.imgStart){
            this.imgStart = {
                x:0,
                y:0
             };
        }
        if(!this.img){
            let imageObj = new Image();
            imageObj.src = this.imgurl;
            this.img = imageObj;
        }
        Object.defineProperty(this,'imgurl',{
            set:function(newValue){
                let imageObj = new Image();
                imageObj.src = newValue;
                this.img = imageObj;
            }
        })
        this._width = this.width;
        this._height = this.height;
        this.addText = this.addText.bind(this);
        this.clearText = this.clearText.bind(this);
        this.addMark = this.addMark.bind(this);
        this.removeMarkBySort = this.removeMarkBySort.bind(this);
        this.getText = this.getText.bind(this);
    }
    //this.alpha;
    //this.marginLeft
    //this.marginTop
    //this.img = options.img;
    //this.isTrace
    //this.attr
    //this.id = options.id;
    addText(text){
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
    clearText(){
        if(this.text){
            this.text.splice(0,this.text.length);
        }
    };
    getText(textId){
        if(!this.text){
            return false;
        }
        for(var i=0; i<this.text.length; i++){
            if(this.text[i].id == textId){
                return this.text[i];
            }
        }
    };
    addMark(mark){
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
    removeMarkBySort(sort){
        if(!this.marks)return;
        for(var i=0; i<this.marks.length; i++){
            if(this.marks[i].sort==sort){
                this.marks[i].release();
                this.marks[i] = null;
                this.marks.splice(i, 1);
            }
        }
    }
}
