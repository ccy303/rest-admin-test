import { IsString, IsEnum, Length, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PagingDto } from "src/common/dto/index";
import { StatusEnum } from "src/common/enum/index";

export class CreatePostDto {
    @IsString()
    @Length(0, 50)
    postName: string;

    @IsString()
    @Length(0, 64)
    postCode: string;

    @IsOptional()
    @IsString()
    @IsEnum(StatusEnum)
    status?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Length(0, 500)
    remark?: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @IsNumber()
    postSort?: number;
}

export class UpdatePostDto extends CreatePostDto {
    @ApiProperty({ required: true })
    @IsNumber()
    postId: number;
}

export class ListPostDto extends PagingDto {
    @IsOptional()
    @IsString()
    @Length(0, 50)
    postName?: string;

    @IsOptional()
    @IsString()
    @Length(0, 64)
    postCode?: string;

    @IsOptional()
    @IsString()
    @IsEnum(StatusEnum)
    status?: string;
}
