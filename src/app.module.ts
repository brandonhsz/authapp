import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonModule } from 'nest-winston';
import { loggerConf } from '@/logger';
import { OrganizationModule } from './modules/organization/organization.module';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      type: 'postgres',
      autoLoadEntities: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    WinstonModule.forRoot(loggerConf),
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
