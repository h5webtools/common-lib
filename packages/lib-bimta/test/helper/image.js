/**
 * image
 */

const Queue = require('./queue');

function Image() {
    let srcStr = '';

    Object.defineProperty(this, 'src', {
        configurable: true,
        enumerable: true,
        get: function() {
            return srcStr;
        },
        set: function(newVal) {
            srcStr = newVal;
            Image.loadQueue.enqueue(newVal);
        }
    });
}

Image.loadQueue = new Queue();

Image.prototype.onload = function() {
    console.log('onload');
};

Image.prototype.onerror = function() {
    console.log('onerror');
};

module.exports = window.Image = Image;
