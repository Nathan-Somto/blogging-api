import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== 'body') return value;
      const parsedValue = this.schema.safeParse(value);
      if (parsedValue.success) {
        return parsedValue.data;
      } else {
        throw new Error(parsedValue.error.errors[0].message);
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
