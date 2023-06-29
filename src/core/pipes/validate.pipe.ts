import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        // deleted e.message.message
        // console.log(e);
        throw new UnprocessableEntityException(
          this.handleError(e.getResponse()),
        );
      }
    }
  }

  private handleError(errors) {
    return errors;
  }
}
