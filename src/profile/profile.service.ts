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

    let file = await this.findFileWithProfileId(profileId);

    if(!file || file.fileType !== fileType) {
      file = await this.fileRepository.create({
        fileName,
        fileData,
        fileMimeType,
        fileType,
      });
      file.profile = { id: profileId } as any;
    } else {
      file.fileName = fileName;
      file.fileData = fileData;
      file.fileMimeType = fileMimeType;
      file.fileType = fileType; 
    }

    return this.fileRepository.save(file);
  }

  async createProfile(
    data: {
      nationalId: string;
      birthday: string;
      idCardFile: Express.Multer.File;
      idCardWithFaceFile: Express.Multer.File;
    },
    userId: number,
  ) {
    let profile = await this.getProfile(userId);

    if (!profile) {
      profile = await this.profileRepository.create({
        birthday: data.birthday,
        nationalId: data.nationalId,
      });
      profile.user = { id: userId } as any;
    } else {
      profile.birthday = data.birthday;
      profile.nationalId = data.nationalId;
    }
    const res = await this.profileRepository.save(profile);

    console.log(data.idCardFile);
    console.log(data.idCardWithFaceFile);

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

  async getProfile(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    return profile;
  }

  async findFileWithProfileId(profileId: number) {
    const file = await this.fileRepository.findOne({
      where: { profile: { id: profileId } },
    });

    return file;
  }
}
