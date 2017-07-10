# common-lib

## 公共库

- lib-bimta 业务数据上报

## 安装

```shell
npm i
```

## 库规范

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

其中`package.json`中需要配置`libDefine`字段，需要包含3个字段，`moduleName`,`devDest`,`prodDest`
