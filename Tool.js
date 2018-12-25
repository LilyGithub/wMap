class Tool{
    constructor(props){
        super(props);

        this._realeseObject = this._realeseObject.bind(this);
    }

   
    _realeseObject = function(obj){
    	for(var i in obj){
    		obj[i] = null;
    	}
    	obj = null;
    }
}
