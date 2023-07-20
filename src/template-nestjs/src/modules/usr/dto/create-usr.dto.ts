import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUsrDto {

    @ApiProperty()
    @IsNotEmpty({ message: '邮箱不能为空' })
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly username: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly nickname: string;

    @ApiProperty()
    readonly role: 'ADMIN' | 'USER' | 'VISITOR';

    @ApiProperty()
    readonly avatar: string;
}
