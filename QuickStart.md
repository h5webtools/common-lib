# 快速开始

下面介绍下开发发布一个模块的流程

如果是新开发一个模块，每一步都需要关注

如果是修改一个模块，只需要关注第三步（包括第三步）之后的

### 第一步

项目根目录执行下面命令进行安装项目依赖，如果已安装可以跳过

```shell
$ npm i cross-env -g
$ npm i
```

### 第二步

进入`packages`目录，假如你的模块名称是`lib-module`

执行下面命令，选择`template-common-lib`模板，根据提示填写进行模块初始化

注意：如果没有安装[jfet](http://doc.fe.jyb.com/book/jfet-website/)，请先全局安装

```shell
$ jfet init -o lib-module
```

### 第三步

进入模块目录

开发阶段执行下面命令启动

```shell
$ npm run dev
```

如果需要添加一个内部的模块，比如把`@jyb/lib-extend`添加到`@jyb/lib-module`中，可以执行

```shell
$ lerna add @jyb/lib-extend --scope=@jyb/lib-module --dev
```

注意：因为最后提供的是构建之后的产物，所以这里安装依赖的模块都应该使用`--dev`

`demo`目录下可以添加页面来列举模块的使用，可以在模块的目录执行`jfet server`启动一个静态服务器来访问

### 第四步

为了保证模块的质量和回归测试，建议都要写单元测试，并在构建发布前执行

这里测试框架使用[Mocha](https://mochajs.org/)，断言库使用[Should.js](https://shouldjs.github.io/)

执行下面命令进行单元测试

```shell
$ npm run test // 测试
$ npm run test:cover // 覆盖率
```

### 第五步

模块开发或者修改完之后切记要同步更新文档，在模块目录的`doc`下

### 第六步

构建代码执行

```shell
$ npm run build // 构建
$ npm run build:min // 构建并压缩混淆代码
```

### 第七步

发布前，需要先`把本地的修改都提交`，并且需要先切换npm registry为`http://npm.jyblife.com/`

回到`common-lib`项目根目录，执行

```shell
$ npm run publish
```

再重新发布下文档，执行

```shell
$ npm run doc
```











