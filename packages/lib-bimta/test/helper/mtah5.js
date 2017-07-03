/**
 * MTA
 */

const Queue = require('./queue');

// mta上报队列
const mtaQueue = new Queue();

function clickStat(key, value) {
    mtaQueue.enqueue({
        id: key,
        params: value
    });
}

module.exports = {
    clickStat,
    mtaQueue
};
