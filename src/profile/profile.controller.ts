import { createOkResponse, createResponse } from 'utils/createResponse';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    console.log(file);
  }

  @Post('/files')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCard', maxCount: 1 },
      { name: 'idCardWithFace', maxCount: 1 },
    ]),
  )
  async uploadFiles(@UploadedFiles() files) {
    console.log(files);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCard', maxCount: 1 },
      { name: 'idCardWithFace', maxCount: 1 },
    ]),
  )
  async uploadImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 500 * 1024 }),
          // new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: {
      idCard?: Express.Multer.File;
      idCardWithFace?: Express.Multer.File;
    },
    @Body() body: CreateProfileDto,
    @Request() req,
  ) {
    // console.log(files);
    let { idCard, idCardWithFace } = files;
    idCard = idCard[0];
    idCardWithFace = idCardWithFace[0];

    if(idCard.size > 500 * 1024 || idCardWithFace.size > 500 * 1024) {
      return createResponse(HttpStatus.BAD_REQUEST, 'سایز فایل آپلودی بیشتر از 500 کیلوبایت');
    }
    if(!idCard.mimetype.startsWith('image') || !idCardWithFace.mimetype.startsWith('image')) {
      return createResponse(HttpStatus.BAD_REQUEST, 'فایل باید از نوع عکس باشد');
    }

    const response = await this.profileService.createProfile(
      { ...body, idCardFile: idCard, idCardWithFaceFile: idCardWithFace },
      req.user.id,
    );
    return createOkResponse('اطلاعات با موفقیت ثبت شد', response);
  }

  @Get()
  async getProfile(@Request() req) {
    const profile = await this.profileService.getProfile(req.user.id);
    return createOkResponse(null, profile);
  }
}
