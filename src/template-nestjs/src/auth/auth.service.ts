import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../shared';
import { HttpException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { Auth } from './entities/auth.entity';
@Injectable()
export class AuthService {
    constructor(protected readonly prisma: PrismaService,
        public jwtService: JwtService
    ) { }
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
    async login(params: any) {
        const { user, password } = params
        // 验证user是否邮箱
        const isEmail = user.indexOf('@') > -1
        const userInfo = await this.prisma.user.findUnique({
            where: isEmail ? { email: user } : { username: user }
        })
        if (!userInfo) {
            throw new HttpException('用户不存在', 400);
        }
        if (!compareSync(password, userInfo.password)) {
            throw new HttpException('密码不正确', 400);
        }
        const token = this.createToken({
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
        })
        return { userInfo, token }
    }
    createToken(user: Partial<Auth>) {
        return this.jwtService.sign(user);
    }

    findAll() {
        return this.prisma.user.findMany()
    }

    findOne(username: string) {
        return this.prisma.user.findUnique({ where: { username } })
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
