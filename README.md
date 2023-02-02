# create-vue3-vite-template

## 介绍

帮助下载基于 Vite Vue3 Ts Piana 搭建的基础开发模板
目前可供选择的模板有四大类，vue2（暂未支持）、vue3、node、微信小程序。

vue2模板不支持新建。

### vue3：引入svg图标、scss。

可选模板为

* pure版：未添加多余插件的项目模板，仅包含以上插件

* router+pinia版：添加vue-router、pinia、vueuse。
  
  * 可选element-plus和windicss

### node：express服务器

可选模板为

* pure版：仅express构建的node后端应用

* mysql：添加mysql2插件，可连接操作数据库。

### 微信小程序：集成vant

* 仅集成gvant

| vue2   | vue3         | node  | 微信小程序      |
| ------ | ------------ | ----- | ---------- |
| 未开发不支持 | pure         | pure  | pure（vant） |
|        | router+pinia | mysql |            |
|        |              |       |            |

## 使用说明

使用npm命令新建模板

```
npm init log-cli@latest
```

选择模板，上下方向键进行移动，回车键确认

![命令行](https://i.postimg.cc/B6xz0GKz/pwsh.png)

某些模板可选模块，如vue3可选elemnet-plus和windicss
![pwsh.png](https://i.postimg.cc/R0C8zYRC/pwsh.png)

选择完成后
![完成选择](https://i.postimg.cc/rFw2TKw2/comlll.png)

按照提示命令操作即可