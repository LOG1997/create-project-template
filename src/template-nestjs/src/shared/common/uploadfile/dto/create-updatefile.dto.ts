import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadfileDto {
    @ApiProperty()
    @IsNotEmpty({ message: '文件名不能为空' })
    @IsString()
    readonly filename: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'hash值不能为空' })
    readonly hash: string;

    @ApiProperty()
    @IsNotEmpty({ message: '文件片数不能为0' })
    readonly chunkCount: number;

    @ApiProperty()
    @IsNotEmpty({ message: '当前片数不能为空' })
    readonly chunkIndex: number;



}
