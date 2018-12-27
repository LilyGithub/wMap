class Tool{
    constructor(props){
        
    }

    _realeseObject(obj){
    	for(var i in obj){
    		obj[i] = null;
    	}
    	obj = null;
    }

    
}

const tool = new Tool();
export {Tool as tool}
