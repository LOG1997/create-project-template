import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Auth } from './entities/auth.entity'
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/global/decorator/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
    async login(@Body() params: any, @Req() req: any) {
        const { userInfo, token } = await this.authService.login(params);
        const data = new Auth(userInfo);
        return { data, token }
    }


    @Get()
    @ApiOperation({ summary: '获取所有用户' })
    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth() // swagger文档设置token
    @ApiOkResponse({ type: [Auth] })
    async findAll(@Req() req) {
        // return 'asasas'
        const users = await this.authService.findAll();
        const data = users.map(user => new Auth(user));
        return data
    }

    @Get(':id')
    findOne(@Param('id') username: string) {
        return this.authService.findOne(username);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.remove(+id);
    }
}
