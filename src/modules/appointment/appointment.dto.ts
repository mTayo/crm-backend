import { IsString, IsDateString } from "class-validator";
import { Expose } from "class-transformer";

export class CreateAppointmentDto {
  @IsString()
  @Expose()
  jobId!: string;

  @IsString()
  @Expose()
  technician!: string;

  @IsDateString()
  @Expose()
  startTime!: string;

  @IsDateString()
  @Expose()
  endTime!: string;
}