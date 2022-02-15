const state = {
    pending: 'PENDING',
    fulfilled: 'FULFILLED',
    rejected: 'REJECTED'
};

class CPromise {
    constructor(implmenter) {
        this.state = state.pending;
        this.value = '';
        this.reason = '';
        if (typeof implmenter == 'function') {
            setTimeout(() => {
                implmenter(this.executorResolve.bind(this), this.executorReject.bind(this));
            }, 0);
        }
    }
    thenQ = [];

    executorResolve(value) {
        if (this.state === state.pending) {
            this.value = value;
            this.state = state.fulfilled;
            this.executeThen();
        }
    }
    executorReject(value) {
        if (this.state === state.pending) {
            this.value = value;
            this.state = state.rejected;
        }
    }
    then(callback) {
        this.thenQ.push(callback);
    }
    executeThen() {
        this.thenQ.pop()(this.value);
    }
}
const isThenable = (maybePromise) => maybePromise && typeof maybePromise.then === 'function';

class NPromise {
    constructor(implementer) {
        this.state = state.pending;
        this.value = '';
        this.reason = '';
        try {
            if (typeof implementer === 'function') {
                setTimeout(() => {
                    implementer(this.res.bind(this), this.rej.bind(this));
                }, 0);
            }
        } catch (err) {
            this.rej(err);
        }
    }
    thenQ = [];
    res(value) {
        if (this.state === state.pending) {
            this.value = value;
            this.state = state.fulfilled;
            this.propogateFilled();
        }
    }
    rej() {
        if (this.state === state.pending) {
            this.value = value;
            this.state = state.rejected;
        }
    }
    then(resH, rejH) {
        let innerP = new NPromise();
        this.thenQ.push([ innerP, resH, rejH ]);
        if (this.state == state.fulfilled) {
            this.propogateFilled();
        } else if (this.state == state.rejected) {
            this.propogateRejected();
        }
        return innerP;
    }

    finally(sidefunction) {
        if(this.state!= state.pending) {
            sidefunction();
        }
    }

    propogateFilled() {
        this.thenQ.forEach(([ prom, resH, rejH ]) => {
            if (typeof resH === 'function') {
                let rvalue = resH(this.value);
                if (isThenable(rvalue)) {
                    rvalue.then((val) => prom.res(val), (reason) => prom.rej(reason));
                } else {
                    prom.res(rvalue);
                }
            } else {
                prom.res(this.value);
            }
        });
        this._thenQueue = [];
        this._finallyQueue = [];
    }
    propogateRejected() {
        this.thenQ.forEach(([ prom, _, rejH ]) => {
            if (typeof rejH === 'function') {
                let rvalue = rejH(this.value);
                if (isThenable(rvalue)) {
                    rvalue.then((val) => prom.res(val), (reason) => prom.rej(reason));
                } else {
                    prom.rej(rvalue);
                }
            } else {
                prom.rej(this.value);
            }
        });
        this._thenQueue = [];
        this._finallyQueue = [];
    }
}

let prom = new Promise((res, rej) => {
    res(10);
});

let prom1 = new NPromise((res, rej) => {
    res(10);
});
prom1.then((res) => console.log('custom', res)).then(()=>console.log('wow'));

prom.then((res) => console.log('normal', res));
