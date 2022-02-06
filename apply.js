function greet(msg) {
    console.log(msg, this.name);
}

let obj = {
    name: 'nishant'
};
greet.apply(obj, [ 'hello' ]);

Function.prototype.apply1 = function(thisObj,args){
    obj.applyFunction = this;
    obj.applyFunction(...args);
    delete obj.applyFunction;
};

greet.apply1(obj, [ 'hello' ]);
