/**
 * 队列
 */

class Queue {
  constructor() {
    this._queue = [];
  }

  /**
   * 入列
   */
  enqueue(data) {
    this._queue.push(data);
  }

  /**
   * 出列
   */
  dequeue() {
    return this._queue.shift();
  }

  /**
   * 长度
   */
  size() {
    return this._queue.length;
  }

  /**
   * 清空
   */
  clear() {
    this._queue.length = 0;
  }
}

export default Queue;
