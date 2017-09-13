# common-lib 公共库

## 安装

```shell
npm i cross-env -g
npm i
```

## 发布

发布前，需要先`把本地的修改都提交`，并且需要先切换npm registry为`http://npm.jtjr.com/`

```shell
npm run publish
```

## 文档

```shell
npm run doc
```

## 开发

支持的es2015语法有：[文档](https://babeljs.io/docs/plugins/preset-es2015/)

### 初始化

执行`jfet init`，选择`template-common-lib`

### 库规范

目录结构：

```text
|- lib-bimta
  |- demo # 放置例子
  |- doc # 放置文档
  |  |- API.md # api文档
  |  |- CHANGELOG.md # 更新日志
  |  |- QuickStart.md # 快速开始
  |  |- Example.md # 例子
  |- src # 源代码目录
  |- test # 测试目录
  |- package.json
  |- README.md
```

`package.json`中需要配置`libDefine`字段，包含4个字段：

- `moduleName`，模块名称，引入库文件的时候，会挂载在`window`下
- `devDest`，开发编译输出文件
- `prodDest`，发布编译输出文件
- `minDest`，发布编译输出文件（压缩）

### 修改main字段

一般跟`libDefine.prodDest`一致
