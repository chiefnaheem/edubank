import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestService } from "../service/request.service";

@ApiTags('request-controller')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()

}