import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';



export class CreateArticalDto {

    @ApiProperty()
    @IsNotEmpty({ message: '标题不能为空' })
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty({ message: '内容不能为空' })
    readonly content: string;

    @ApiProperty()
    readonly published: boolean;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;
}
