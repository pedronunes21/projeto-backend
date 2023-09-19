import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseStringPipe implements PipeTransform<any, string> {

    transform(value: any) {
        return String(value)
    }
}