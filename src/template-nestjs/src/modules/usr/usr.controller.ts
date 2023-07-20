import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UsrService } from './usr.service';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { UsrEntity } from './entities/usr.entity';
@Controller('usr')
@ApiTags('usr')
export class UsrController {
    constructor(private readonly usrService: UsrService) { }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    @ApiOkResponse({ type: UsrEntity })
    create(@Body() createUsrDto: CreateUsrDto) {
        return this.usrService.create(createUsrDto);
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    @ApiOkResponse({ type: UsrEntity })
    async login(@Body() params: any) {
        return this.usrService.login(params);
    }


    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: 'get all user' })
    @ApiOkResponse({ type: UsrEntity })
    async findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
        const users = await this.usrService.findAll(page, pageSize);
        const data = users.map((user) => new UsrEntity(user));
        const tatal = await this.usrService.count({});
        return { data, tatal }
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: 'get one user' })
    @ApiOkResponse({ type: UsrEntity })
    async findOne(@Param('id') id: string) {
        const user = await this.usrService.findOne(+id);
        const data = new UsrEntity(user);
        return data
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsrDto: UpdateUsrDto) {
        return this.usrService.update(+id, updateUsrDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usrService.remove(+id);
    }
}
