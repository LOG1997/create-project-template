import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req, Request, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { Auth } from './entities/auth.entity'
import { Public } from 'src/global/decorator/public.decorator';
import { AuthUser } from 'src/global/decorator/user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }

    @Post()
    @Public()
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '创建用户' })
    @ApiOkResponse({ type: Auth })
    async create(@Body() createAuthDto: CreateAuthDto) {
        const user = await this.authService.create(createAuthDto);
        const data = new Auth(user);
        return data
    }

    @Post('login')
    @Public()
    @ApiOperation({ summary: '登录' })
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOkResponse({ type: Auth })
    async login(@Body() params: { user: string, password: number | string }, @Req() req: Request) {
        const { userInfo, token } = await this.authService.login(params);
        const data = new Auth(userInfo);
        return { data, token }
    }


    @Get()
    @ApiOperation({ summary: '获取所有用户' })
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOkResponse({ type: [Auth] })
    async findAll(@Body() params: { page: number, pageSize: number }, @AuthUser() user: any,) {
        if (user.role !== 'ADMIN') {
            throw new HttpException('没有权限', 403)
        }
        const { page = 1, pageSize = 10 } = params
        // return 'asasas'
        const users = await this.authService.findAll({ page, pageSize });
        const data = users.map(user => new Auth(user));
        const tatal = await this.authService.count({});
        return { data, tatal }
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '查找单个用户' })
    @ApiOkResponse({ type: Auth })
    findOne(@Param('id') id: string) {
        return this.authService.findOne(+id);
    }

    @Patch(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '更新用户' })
    @ApiOkResponse({ type: Auth })
    async update(@Param('id') id: string, @AuthUser() user: any, @Body() updateAuthDto: UpdateAuthDto, @Req() req: Request) {
        if (user.id !== +id) {
            throw new HttpException('没有权限', 403)
        }
        const data = await this.authService.update(+id, updateAuthDto);
        return new Auth(data)
    }

    @Delete(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiOperation({ summary: '删除用户' })
    @ApiOkResponse({ type: Auth })
    async remove(@Param('id') id: string, @AuthUser() user: any,) {
        if (user.role !== 'ADMIN' && user.id !== +id) {
            throw new HttpException('没有权限', 403)
        }
        const delUser = await this.authService.remove(+id);
        return new Auth(delUser)
    }
}
