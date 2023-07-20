import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class LoginAuthDto {
    @ApiProperty({ description: '用户名或邮箱', example: 'admin' })
    readonly user: string;
    @ApiProperty({ description: '密码', example: '1' })
    readonly password: string;
}
export class CreateAuthDto {

    @ApiProperty({ description: '用户名', example: 'admin' })
    @IsNotEmpty({ message: '用户名不能为空' })
    readonly username: string;

    @ApiProperty({ description: '邮箱', example: '12@qq.com' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    readonly email: string;

    @ApiProperty({ description: '密码', example: '1' })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    @ApiProperty({ description: '角色', example: 'VISITOR' })
    readonly role: 'ADMIN' | 'USER' | 'VISITOR';

    @ApiProperty({ description: '昵称', example: 'admin' })
    readonly nickname: string;

    @ApiProperty({ description: '头像', example: 'https://www.baidu.com' })
    readonly avatar: string;


}