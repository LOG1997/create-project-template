import { PrismaService } from '../../shared'
import { Injectable, HttpException } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsrService {
    constructor(private readonly prisma: PrismaService) { }
    async create(createUsrDto: CreateUsrDto) {
        const existEmail = await this.prisma.user.findUnique({ where: { email: createUsrDto.email } });
        const existUsername = await this.prisma.user.findUnique({ where: { username: createUsrDto.username } });
        if (existEmail) {
            throw new HttpException('邮箱已注册', 400)
        }
        if (existUsername) {
            throw new HttpException('用户名已存在', 400)
        }
        return this.prisma.user.create({ data: createUsrDto })
    }

    async findAll(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = Number(pageSize);
        const res = this.prisma.user.findMany({
            skip,
            take,
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                nickname: true,
                role: true,
            }
        });
        return res
    }
    async count(params: any) {
        return this.prisma.user.count({ where: params })
    }
    async login(params: any) {
        const { user, password } = params
        // 验证user是否邮箱
        const isEmail = user.indexOf('@') > -1
        const userInfo = await this.prisma.user.findUnique({
            where: isEmail ? { email: user } : { username: user }
        })
        if (!userInfo) {
            throw new HttpException('用户不存在', 400)
        }
        if (userInfo.password !== password) {
            throw new HttpException('密码错误', 400)
        }
        return userInfo
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } })
    }

    update(id: number, updateUsrDto: UpdateUsrDto) {
        return `This action updates a #${id} usr`;
    }

    remove(id: number) {
        return `This action removes a #${id} usr`;
    }
}
