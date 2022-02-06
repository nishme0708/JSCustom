function hello(greet) {
    console.log(greet, this.name);
}

let obj = {
    name: 'nishant',
    hello
};

let nishHello = hello.bind(obj);
nishHello('welcome');

let obj1 = {
    name: 'swapnil'
};

Function.prototype.bind1 = function(thisObj) {
    let func = this;
    return (...args) => {
        func.call(thisObj, ...args);
    };
};

let swapHello = hello.bind1(obj1);
swapHello('morning');
