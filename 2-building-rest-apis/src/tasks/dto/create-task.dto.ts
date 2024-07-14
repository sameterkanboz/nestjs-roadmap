import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  //auto creating id

  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @IsDateString()
  @IsNotEmpty()
  readonly dueDate: Date;
}
