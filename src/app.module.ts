import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
