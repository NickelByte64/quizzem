import { Module } from '@nestjs/common';
import { EventsGateway } from '~/src/features/question/question.gateway';

@Module({
  providers: [EventsGateway],
})
export class QuestionModule {}
