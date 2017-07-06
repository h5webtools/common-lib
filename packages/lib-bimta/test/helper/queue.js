/**
 * 上报队列
 */

function Queue() {
    this.lists = [];
}

Queue.prototype.enqueue = function(val) {
    return this.lists.push(val);
};

Queue.prototype.dequeue = function() {
    return this.lists.shift();
};

Queue.prototype.length = function() {
    return this.lists.length;
};

Queue.prototype.clear = function() {
    this.lists.length = 0;
};

export default Queue;

