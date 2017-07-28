# common-lib

## 公共库

- lib-bimta 业务数据上报

## 安装

```shell
npm i
```

## 开发

### 初始化

执行`jfet init --ls`，选择`template-common-lib`

### 库规范

目录结构：

```text
|- lib-bimta
  |- demo # 放置例子
  |- doc # 放置文档
  |- |- API.md # api文档
  |- |- CHANGELOG.md # 更新日志
  |- |- QuickStart.md # 快速开始
  |- src # 源代码目录
  |- test # 测试目录
  |- package.json
  |- README.md
```

`package.json`中需要配置`libDefine`字段，包含3个字段：

- `moduleName`，模块名称，引入库文件的时候，会挂载在`window`下
- `devDest`，开发编译输出文件
- `prodDest`，发布编译输出文件

### 修改main字段

一般跟`libDefine.prodDest`一致