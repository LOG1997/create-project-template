import { PrismaService } from '../../shared'
import { Injectable, HttpException } from '@nestjs/common';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { UsrEntuty } from './entities/usr.entity';
@Injectable()
export class UsrService {
    constructor(private readonly prisma: PrismaService) { }
    async create(createUsrDto: CreateUsrDto) {
        const userInfo = await this.prisma.user.findUnique({ where: { email: createUsrDto.email } });
        if (userInfo) {
            throw new HttpException('用户已存在', 400)
        }
        return this.prisma.user.create({ data: createUsrDto })
    }

    async findAll(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const take = 
        return this.prisma.user.findMany(
            {
                skip,
                take,
            }
        );
    }

    findOne(id: number) {
        return `This action returns a #${id} usr`;
    }

    update(id: number, updateUsrDto: UpdateUsrDto) {
        return `This action updates a #${id} usr`;
    }

    remove(id: number) {
        return `This action removes a #${id} usr`;
    }
}
