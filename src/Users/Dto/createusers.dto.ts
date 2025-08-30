import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class createUserSettingDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @Type(() => createUserSettingDto)
  @ValidateNested()
  settings?: createUserSettingDto;
}
