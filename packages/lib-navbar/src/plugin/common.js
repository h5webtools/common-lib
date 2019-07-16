/**
 * 通用插件
 */

export default {
  defaultOptions: {
    rendered(/* ctx */) {},
    navbarBgCls: 'navbar-bg-color'
  },
  plugin(options) {
    const { navbarBgCls, rendered } = options;

    this.on('rendered', (ctx) => {
      if (typeof addCssText === 'function') rendered(ctx);
    });

    this.on('scrollTop', (ctx) => {
      ctx.$el.classList.remove(navbarBgCls);
    });
    this.on('scroll', (ctx) => {
      if (!ctx.$el.classList.contains(navbarBgCls)) {
        ctx.$el.classList.add(navbarBgCls);
      }
    });
    this.render();
  }
};
