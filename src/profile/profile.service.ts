import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files, FILE_TYPES } from 'entities/FIles';
import { UserProfile } from 'entities/UserProfile';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Files)
    private fileRepository: Repository<Files>,
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
  ) {}

  async saveFile(
    originalFileName: string,
    fileData: Buffer,
    fileMimeType: string,
    fileType: FILE_TYPES,
    profileId: number,
  ): Promise<Files> {
    const fileName = originalFileName.split('.')[0];

    const file = await this.fileRepository.create({
      fileName,
      fileData,
      fileMimeType,
      fileType,
    });
    file.profile = { id: profileId } as any;

    return this.fileRepository.save(file);
  }

  async saveNationalIdAndBirthday() {}

  async createProfile(
    data: {
      nationalId: string;
      birthday: string;
      idCardFile: Express.Multer.File;
      idCardWithFaceFile: Express.Multer.File;
    },
    userId: number,
  ) {
    const profile = await this.profileRepository.create({
      birthday: data.birthday,
      nationalId: data.nationalId,
    });
    profile.user = { id: userId } as any;

    const res = await this.profileRepository.save(profile);

    await this.saveFile(
      data.idCardFile.originalname,
      data.idCardFile.buffer,
      data.idCardFile.mimetype,
      FILE_TYPES.ID_CARD,
      profile.id,
    );
    await this.saveFile(
      data.idCardWithFaceFile.originalname,
      data.idCardWithFaceFile.buffer,
      data.idCardWithFaceFile.mimetype,
      FILE_TYPES.ID_CARD_WITH_FACE,
      profile.id,
    );

    return res;
  }
}
