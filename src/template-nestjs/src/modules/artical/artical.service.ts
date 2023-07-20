import { Injectable } from '@nestjs/common';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
import { PrismaService } from '../../shared'
@Injectable()
export class ArticalService {
    constructor(private readonly prisma: PrismaService) { }
    create(createArticalDto: CreateArticalDto) {
        return 'This action adds a new artical';
    }

    findAll() {
        return `This action returns all artical`;
    }

    findOne(id: number) {
        const artical = this.prisma.artical.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        avatar: true,
                        nickname: true,
                        role: true,
                    }
                }
            }
        })
        return artical
    }

    update(id: number, updateArticalDto: UpdateArticalDto) {
        return `This action updates a #${id} artical`;
    }

    remove(id: number) {
        return `This action removes a #${id} artical`;
    }
}
