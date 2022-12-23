Array.prototype.sum = function (v2) {

    if (this.length !== v2.length) {
        throw new Error("Different Length");
    }

    let r = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        r[i] = this[i] + v2[i];
    }

    return r;
};

Array.prototype.subtract = function (v2) {

    if (this.length !== v2.length) {
        throw new Error("Different Length");
    }

    let r = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        r[i] = this[i] - v2[i];
    }

    return r;
};

Array.prototype.norm = function () {

    let sum = 0.0;

    for (let i = 0; i < this.length; i++) {
        sum += Math.pow(this[i], 2);
    }

    return Math.sqrt(sum);
};

Array.prototype.unitVector = function () {

    let d = this.norm();

    let r = new Array(this.length);

    if (d != 0) {
        for (let i = 0; i < this.length; i++) {
            r[i] = this[i] / d;
        }
    }

    return r;
};

Array.prototype.scale = function (s) {

    let r = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        r[i] = this[i] * s;
    }

    return r;
};

Array.prototype.dot = function (v2) {

    if (this.length !== v2.length) {
        throw new Error("Different Length");
    }

    let sum = 0.0;

    for (let i = 0; i < this.length; i++) {
        sum += this[i] * v2[i];
    }

    return sum;
};

Array.prototype.copy = function () {

    let r = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        r[i] = this[i];
    }

    return r;
};

Array.prototype.range = function (startInclusive, endInclusive, step = 1) {

    let values = [];

    for (let i = startInclusive; i <= endInclusive; i += step) {
        values.push(i);
    }

    return values;
};

Array.prototype.removeByIndex = function (index) {

    if (index < 0 || index >= this.length) {
        throw new Error("Out of index");
    }

    let r = new Array();

    for (let i = 0; i < this.length; i++) {

        if (i !== index) {
            r.push(this[i]);
        }
    }

    return r;
};

Array.prototype.equalsTo = function (array) {

    if (this.length !== array.length) {
        throw new Error("Different Length");
    }

    for (let i = 0; i < this.length; i++) {

        if (this[i] !== array[i]) {
            return false;
        }
    }

    return true;
};
