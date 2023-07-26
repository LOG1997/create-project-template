import { ApiProperty } from '@nestjs/swagger';

export class Uploadfile {

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly filename: string;

    @ApiProperty()
    readonly size: string;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly hash: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

}
