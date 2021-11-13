import {VersioningType} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true
  });

  app.useStaticAssets(resolve(__dirname, './../public'), {
    prefix: '/assets',
  });
  app.setBaseViewsDir(resolve(__dirname, './../views'));
  app.setViewEngine('hbs');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  await app.listen(3000);

  const urlApp = await app.getUrl();

  console.log(`HTTP run at: ${urlApp}`);
}
bootstrap();
