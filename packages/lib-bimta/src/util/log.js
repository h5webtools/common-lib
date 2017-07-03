/**
 * 日志
 */

/**
 * 信息
 * @param {String} msg
 */
export function info(msg) {
    console.log(`INFO: ${msg}`);
}

/**
 * 警告
 * @param {String} msg
 */
export function warn(msg) {
    console.log(`WARN: ${msg}`);
}

/**
 * 错误
 * @param {String} msg
 */
export function error(msg) {
    console.log(`ERROR: ${msg}`);
}
