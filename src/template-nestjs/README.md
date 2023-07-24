<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>




<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>


## 安装初始化

```bash
# install
$ pnpm install
# 配置环境变量`/.env`，主要配置连接数据库的信息


# 首先初始化prisma
# 按dev/test/prod环境不同命令不同
$ pnpm run migrate:dev
```

## 运行

```bash

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# watch mode with test
$ pnpm run start:test

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## 描述

nest启动模板，集成prisma、swagger

## License

Nest is [MIT licensed](LICENSE).
