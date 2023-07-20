import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArticalService } from './artical.service';
import { CreateArticalDto } from './dto/create-artical.dto';
import { UpdateArticalDto } from './dto/update-artical.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/global/decorator/public.decorator';

@Controller('artical')
@ApiTags('artical')
export class ArticalController {
    constructor(private readonly articalService: ArticalService) { }

    @Post()
    create(@Body() createArticalDto: CreateArticalDto) {
        return this.articalService.create(createArticalDto);
    }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth() // swagger文档设置token
    findAll() {
        return this.articalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articalService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArticalDto: UpdateArticalDto) {
        return this.articalService.update(+id, updateArticalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articalService.remove(+id);
    }
}
