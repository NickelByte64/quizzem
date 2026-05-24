import { Module } from '@nestjs/common';
import { DbModule } from '~/src/core/db/db.module';
import { HostModule } from '~/src/features/host/host.module';
import { QuestionModule } from '~/src/features/question/question.module';

@Module({
  imports: [DbModule, HostModule, QuestionModule],
})
export class AppModule {}
