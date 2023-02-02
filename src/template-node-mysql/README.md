# node-express back-end
node+express搭建的后端系统（纯净版）
## 文件目录
<img src="https://i.postimg.cc/Y2snrrMs/Snipaste-2022-10-23-10-47-14.png" alt="文件目录">

* ```app.js```为入口文件
* ```./router/router.js```为路由管理文件，统一管理接口
* ```./httpsKeys```文件夹存储申请好的ssl证书

## mysql模块
使用```mysql2```模块，封装了同步以及异步的方法。
```mysql```配置文件置于```config/sql_connecta_config.js```中
## 封装方法的使用
### 同步方法
如```./router/test.js```文件中```testAsyncMysql```方法所示
其中```sql```语句之后所带参数为数组
### 异步方法
```node```默认为异步执行

如```./router/test.js```文件中```testMysql```方法所示