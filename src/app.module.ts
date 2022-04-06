import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ViacepService } from './services/viacep/viacep.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, ViacepService],
})
export class AppModule {}
