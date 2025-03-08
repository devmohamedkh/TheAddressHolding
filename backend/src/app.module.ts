import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from "./users/users.module";
import { AppService } from "./app.service";
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { RequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
<<<<<<< HEAD
import { ApartmentModule } from './apartment/apartment.module';
import { ApartmentTypeModule } from './apartment-type/apartment-type.module';
=======
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')!, 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot({
      transports: [
       new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
        // logging all level
        new transports.File({
          filename: `logs/combined.log`,
          format: format.combine(format.timestamp(), format.json()),
        }),
        // we also want to see logs in our console
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],

    }),  
    UsersModule,
    AuthModule,
<<<<<<< HEAD
    ApartmentModule,
    ApartmentTypeModule,
=======
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}