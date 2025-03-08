import {
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard, JwtRefreshAuthGuard } from '../common/guards';
import { CurrentUser } from '../common/decorators';
<<<<<<< HEAD
import { User } from '../users/entities/user.entity';
=======
import { User } from '../users/schema/user.entity';
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthTokenResponse } from './types';
import { ApiLoginOperation ,ApiLogoutOperation,ApiRefreshTokenOperation} from './swaggerHelpers';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiLoginOperation()
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
<<<<<<< HEAD
  )  {
    return await this.authService.login(user, response);
 
=======
  ) : Promise<AuthTokenResponse> {
    return await this.authService.login(user, response);
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiRefreshTokenOperation()
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthTokenResponse> {
    return await this.authService.refreshTokens(user, response);
  }

  @Post('logout')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiLogoutOperation()
  async logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(user, response);
  }
}
