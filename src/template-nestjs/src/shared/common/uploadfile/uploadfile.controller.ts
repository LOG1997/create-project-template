import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { PrcheckUploadfileDto } from './dto/precheck-uploadfile.dto';
import { CreateUploadfileDto } from './dto/create-updatefile.dto';
// import { UpdateUploadfileDto } from './dto/update-uploadfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { MulterProvider } from '@nestjs/platform-express';

@ApiTags('uploadfile')
@Controller('uploadfile')
export class UploadfileController {
    constructor(private readonly uploadfileService: UploadfileService,
        private readonly multerProvider: MulterProvider
    ) { }
    @Post('precheck')
    @ApiOperation({ summary: '文件预检接口' })
    @ApiOkResponse({ description: '上传文件' })
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() precheckUploadfileDto: PrcheckUploadfileDto) {
        const data = await this.uploadfileService.hashFile(precheckUploadfileDto);
        return data
    }

    @Post('upload')
    @ApiOperation({ summary: '上传文件' })
    @ApiOkResponse({ description: '上传文件' })
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Body() body: CreateUploadfileDto, @UploadedFile() file: Express.Multer.File) {
        console.log('😆file:', file)
        console.log('😉body:', body)
        await this.uploadfileService.uploadFile(body,);
        return body.hash
    }
}
