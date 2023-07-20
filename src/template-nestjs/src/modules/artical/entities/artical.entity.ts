import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Artical {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly content: string;

    @ApiProperty()
    readonly authorId: number;

    @ApiProperty()
    readonly published: boolean;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;
}
