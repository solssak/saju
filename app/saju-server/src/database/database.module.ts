import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        return {
          uri:
            nodeEnv === 'production'
              ? configService.get<string>('MONGODB_URI')
              : configService.get<string>('MONGODB_LOCAL_URI'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
