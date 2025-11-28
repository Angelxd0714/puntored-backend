// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/domain/entities/user.entity';
import { Charge } from '../charges/domain/entities/charge.entity'; // si existe

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5438,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'puntored',
      entities: [User, Charge],
      synchronize: true,
      logging: ['query', 'error', 'warn', 'info'],
      connectTimeoutMS: 10000,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
