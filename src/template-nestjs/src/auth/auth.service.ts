import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
// import { PrismaService } from '../shared';
import { PrismaService } from 'nestjs-prisma';
import { HttpException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { LoggerService } from 'src/shared/common/logger/logger.service';
import { RedisService } from 'src/shared/common/redis/redis.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(protected readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly logger: LoggerService,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
    ) {
        this.logger.setContext(AuthService.name);
    }
    // 注册
    async create(createAuthDto: CreateAuthDto) {
        const existEmail = await this.prisma.user.findUnique({ where: { email: createAuthDto.email } });
        const existUsername = await this.prisma.user.findUnique({ where: { username: createAuthDto.username } });
        if (existEmail) {
            throw new HttpException('邮箱已注册', 400)
        }
        if (existUsername) {
            throw new HttpException('用户名已存在', 400)
        }
        createAuthDto.password = hashSync(createAuthDto.password, 10);
        return this.prisma.user.create({ data: createAuthDto })
    }
    // 登录
    async login(params: { user: string, password: number | string }) {

        console.log("😄this.configService.get('REDIS_HOST'): ", this.configService.get('REDIS_HOST'))
        const { user, password } = params
        // 验证user是否邮箱
        const isEmail = user.indexOf('@') > -1
        console.log('😇isEmail:', isEmail)
        const userInfo = await this.prisma.user.findUnique({
            where: isEmail ? { email: user } : { username: user }
        })

        if (!userInfo) {
            throw new HttpException('用户不存在', 400);
        }
        if (!compareSync(password.toString(), userInfo.password)) {
            throw new HttpException('密码不正确', 400);
        }
        const token = this.createToken({
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
        })
        // NOTE:是否使用redis,保存token
        if (this.configService.get('REDIS_HOST')) {
            await this.redisService.set(`${userInfo.id} & ${userInfo.username}`, token, 'EX', 2 * 60 * 60)
        }
        return { userInfo, token }
    }
    // 退出登录
    async logout(id: number) {
        const userInfo = await this.prisma.user.findUnique({ where: { id } })
        if (!userInfo) {
            throw new HttpException('用户不存在', 400)
        }
        // NOTE:是否使用redis
        if (this.configService.get('REDIS_HOST')) {
            await this.redisService.del(`${userInfo.id} & ${userInfo.username}`)
        }
        return { message: '退出登录成功' }
    }
    // 生成token
    createToken(user: Partial<Auth>) {
        const expireTime = this.configService.get('JWT_EXPIRE_TIME', '2h');
        console.log('😔expireTime:', expireTime)
        // NOTE:是否使用redis
        if (this.configService.get('REDIS_HOST')) {
            return this.jwtService.sign(user)
        }

        return this.jwtService.sign(user, { expiresIn: expireTime });
    }
    // 查找所有用户
    findAll({ page = 1, pageSize = 10 }) {
        return this.prisma.user.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id }, select: { username: true, email: true, role: true, id: true } })
    }
    async count(params: any) {
        return this.prisma.user.count({ where: params })
    }
    update(id: number, updateAuthDto: UpdateAuthDto) {
        const user = this.prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw new HttpException('用户不存在', 400)
        }
        return this.prisma.user.update({ where: { id }, data: updateAuthDto })
    }

    async remove(id: number) {
        const exitUser = await this.prisma.user.findUnique({ where: { id } })
        if (!exitUser) {
            throw new HttpException('用户不存在', 400)
        }
        return this.prisma.user.delete({ where: { id } })
    }
}
