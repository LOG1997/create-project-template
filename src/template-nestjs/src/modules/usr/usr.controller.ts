import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UsrService } from './usr.service';
import { CreateUsrDto } from './dto/create-usr.dto';
import { UpdateUsrDto } from './dto/update-usr.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { UsrEntuty } from './entities/usr.entity';
@Controller('usr')
@ApiTags('usr')
export class UsrController {
    constructor(private readonly usrService: UsrService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiOkResponse({ type: UsrEntuty })
    create(@Body() createUsrDto: CreateUsrDto) {
        return this.usrService.create(createUsrDto);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: 'get all user' })
    @ApiOkResponse({ type: UsrEntuty })
    async findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
        const users = await this.usrService.findAll(page, pageSize);
        return users.map((user) => new UsrEntuty(user));
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usrService.findOne(+id);
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
