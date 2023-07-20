import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UsrEntity implements User {
    constructor(partial: Partial<UsrEntity>) { Object.assign(this, partial); }
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;
    @Exclude()
    password: string;
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    role: 'ADMIN' | 'USER' | 'VISITOR';
    @ApiProperty()
    avatar: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
