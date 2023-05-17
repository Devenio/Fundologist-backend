import { createOkResponse } from 'utils/createResponse';
import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCard', maxCount: 1 },
      { name: 'idCardWithFace', maxCount: 1 },
    ]),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: {
      idCard: Express.Multer.File;
      idCardWithFace: Express.Multer.File;
    },
    @Body() body: CreateProfileDto,
    @Request() req,
  ) {
    const { idCard, idCardWithFace } = files;
    const response = await this.profileService.createProfile(
      { ...body, idCardFile: idCard, idCardWithFaceFile: idCardWithFace },
      req.user.id,
    );
    return createOkResponse('اطلاعات با موفقیت ثبت شد', response);
  }
}
