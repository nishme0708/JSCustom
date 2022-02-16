function getPromise(time, index) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(index);
        }, time);
    });
}

let arr = [ getPromise(3000, 1), getPromise(2000, 2), getPromise(1000, 3) ];

// Promise.any(arr).then(alert,alert);

async function getName() {
    let val = await getPromise(4000, 343);
    alert(val);
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHello = function() {
    console.log('Hello ', this.name);
};

let p1 = new Person('nishant',30);
let p2 = new Person('darshan',30);

for(let i in p1) {
    if(p1.hasOwnProperty(i)) console.log(i);
}

function Student(name,age,studentId){
    this.studentId = studentId;
    Person.apply(this,arguments);
}
Student.prototype = new Person();