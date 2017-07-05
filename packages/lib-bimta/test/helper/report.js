/**
 * report helper
 */

const reportURL = {
    test: '//172.16.1.16:8890',
    prod: '//report.jyblife.com'
};

export function reportURLInverse(url) {
    const arrURL = url.replace(`${reportURL.test}?`, '').split('&');

    return arrURL.reduce((obj, item) => {
        const curr = item.split('=');

        obj[decodeURIComponent(curr[0])] = decodeURIComponent(curr[1]);
        return obj;
    }, {});
}

