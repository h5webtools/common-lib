module.exports = {
  server(abc, context) {
    /* eslint-disable require-yield */
    context.registerRouter('get', '/api/getName', function* () {
      // this.statusCode = 404;
      this.body = {
        code: '1000',
        data: {
          name: 'canye'
        }
      };
    });
  }
};
