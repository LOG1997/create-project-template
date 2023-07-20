# 基础镜像
FROM node:18

# 创建应用目录
WORKDIR /usr/src/app

# 使用通配符来确保 package.json 和 package-lock.json 被复制
COPY package*.json ./

# 安装应用依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用，并创建「dist」目录
RUN npm run build

# 启动服务
CMD [ "node", "dist/main.js" ]

