import { CreateConversationDTO } from './dto/createConversation.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { User } from '@app/modules/user/entities/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { ConversationService } from '@app/modules/conversation/conversation.service';
import { UpdateConversationDTO } from '@app/modules/conversation/dto/updateConversation.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/decorators/user.decorator';
import { JWTGuard } from '@app/guards/jwt.guard';

@ApiTags('conversation')
@UseGuards(JWTGuard)
@ApiBearerAuth('access-token')
@Controller('conversation')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createConversationDTO: CreateConversationDTO,
    @CurrentUser() user: User,
  ) {
    return this.conversationService.create(user, createConversationDTO);
  }

  @Get()
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Enter a title of conversation',
  })
  async findAll(@CurrentUser() user: User, @Query('q') q?: string) {
    return this.conversationService.findAll(user, q);
  }

  @Get(':id')
  async findOne(@CurrentUser() user: User, @Param('id') id: string) {
    return this.conversationService.findOne(user, id);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateConversationDTO,
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() updateConversationDto: UpdateConversationDTO,
  ) {
    return this.conversationService.update(user, id, updateConversationDto);
  }

  @Put(':id/:candidateId')
  async updateMembers(
    @Param('id') id: string,
    @Param('candidateId') candidateId: string,
    @CurrentUser() user: User,
  ) {
    const candidate = await this.userService.findOneBy('id', candidateId);
    return this.conversationService.addMember(user, id, candidate);
  }

  @Delete(':id/:candidateId')
  async deleteMembers(
    @Param('id') id: string,
    @Param('candidateId') candidateId: string,
    @CurrentUser() user: User,
  ) {
    const candidate = await this.userService.findOneBy('id', candidateId);
    return this.conversationService.deleteMember(user, id, candidate.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.conversationService.remove(user, id);
  }
}
