/* eslint-disable */
class FooBar {
    constructor(x) {
        this.x = x;
        this._set = new Set([1, 2, 3]);
    }
}

const fooBar = new FooBar();
console.log(fooBar);
