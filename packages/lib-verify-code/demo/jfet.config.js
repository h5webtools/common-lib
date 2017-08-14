module.exports = {
  server(abc, context) {
    // jfet server -c ../
    const proxy = context.proxy;

    context.registerRouter('post', '/proxy/base/index', proxy({
      url: 'http://172.16.1.16:9013/act_access/base/index'
    }));
  }
};
