/**
 * MTA
 */

import Queue from './queue';

// mta上报队列
export const mtaQueue = new Queue();

export function clickStat(key, value) {
    mtaQueue.enqueue({
        id: key,
        params: value
    });
}

