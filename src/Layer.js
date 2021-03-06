
import Element from "./Element.js";

export default class Layer extends Element{
    constructor(props){
        super(props);
        this.type = "layer";
        if(!this.imgStart){
            this.imgStart ={ 
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
        this.addText = this.addText.bind(this);
    }
    
    //this.alpha
    //this.img
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
}
