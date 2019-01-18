module.exports = {
  server(abc, context) {
    // jfet server -c ../
    const proxy = context.proxy;

    context.registerRouter('post', '/proxy/base/index', proxy({
      url: 'https://swebsit.jyblife.com/base/index',
      host: 'https://swebsit.jyblife.com',
      requestOptions: {
        strictSSL: false
      }
    }));

    context.registerRouter('post', '/proxy/base/code', proxy({
      url: 'https://swebsit.jyblife.com/base/code',
      host: 'https://swebsit.jyblife.com',
      requestOptions: {
        strictSSL: false
      }
    }));
  }
};
