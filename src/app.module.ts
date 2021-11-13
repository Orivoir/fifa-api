import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { PlayersController } from './players/players.controller';

@Module({
  imports: [PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
