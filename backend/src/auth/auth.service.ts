import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
<<<<<<< HEAD
import { User } from '../users/entities/user.entity';
=======
import { User } from '../users/schema/user.entity';
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { TokenPayload, AuthTokenResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

<<<<<<< HEAD
  async login(user: User, response: Response) {
=======
  async login(user: User, response: Response) : Promise<AuthTokenResponse> {
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
    const accessTokenExpiryMs = this.getConfigNumber(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
    );
    const refreshTokenExpiryMs = this.getConfigNumber(
      'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    );

    const accessTokenExpiry = this.getExpirationDate(accessTokenExpiryMs);
    const refreshTokenExpiry = this.getExpirationDate(refreshTokenExpiryMs);

    const tokenPayload: TokenPayload = { userId: user.id as string };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateJwtToken(
        tokenPayload,
        'JWT_ACCESS_TOKEN_SECRET',
        accessTokenExpiryMs,
      ),
      this.generateJwtToken(
        tokenPayload,
        'JWT_REFRESH_TOKEN_SECRET',
        refreshTokenExpiryMs,
      ),
    ]);

    await this.storeHashedRefreshToken(user.id as string, refreshToken);

    this.setAuthCookies(
      response,
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    );

    return {
<<<<<<< HEAD
      accessToken,
      ...user,
    };
=======
      accessToken
    }
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  }

  async refreshTokens(
    user: User,
    response: Response,
  ): Promise<AuthTokenResponse> {
<<<<<<< HEAD
=======

>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
    const accessTokenExpiryMs = this.getConfigNumber(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
    );

    const accessTokenExpiry = this.getExpirationDate(accessTokenExpiryMs);

    const tokenPayload: TokenPayload = { userId: user.id as string };

    const newAccessToken = await this.generateJwtToken(
      tokenPayload,
      'JWT_ACCESS_TOKEN_SECRET',
      accessTokenExpiryMs,
    );

    this.setAuthCookies(
      response,
      newAccessToken,
      null,
      accessTokenExpiry,
      null,
    );

    return {
<<<<<<< HEAD
      accessToken: newAccessToken,
    };
=======
      accessToken: newAccessToken
    }
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  }

  async logout(user: User, response: Response): Promise<void> {
    await this.usersService.updateUser(
<<<<<<< HEAD
      { where: { id: user.id } },
=======
      { id: user.id },
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
      { refreshToken: '' },
    );
    this.setAuthCookies(response, '', '', new Date(0), new Date(0));
  }

  async isPasswordMatch(email: string, password: string) {
    try {
<<<<<<< HEAD
      const user = await this.usersService.getUser({
        where: { email },
        select: [
          'createdAt',
          'email',
          'password',
          'id',
          'updatedAt',
          'refreshToken',
          'role',
          'updatedAt',
          'name',
        ],
      });

      const isPasswordMatched = await user.validatePassword(password);

=======
      const user = await this.usersService.getUser({  email });
      
      
      const isPasswordMatched = await compare(password, user.password);
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
      if (!isPasswordMatched) {
        throw new BadRequestException('Credentials are not valid.');
      }

      return user;
    } catch (err) {
<<<<<<< HEAD
=======
      console.log(err);
      
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
      throw new BadRequestException('Credentials are not valid.');
    }
  }

  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
<<<<<<< HEAD
      const user = await this.usersService.getUser({
        where: { id: userId },
        select: [
          'createdAt',
          'email',
          'id',
          'updatedAt',
          'refreshToken',
          'role',
          'updatedAt',
          'name',
        ],
      });
=======
      const user = await this.usersService.getUser({ id: userId });
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
      const isRefreshTokenValid = await compare(
        refreshToken,
        user.refreshToken!,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  /**
   * Retrieves a numeric configuration value from ConfigService.
   */
  private getConfigNumber(key: string): number {
    return Number(this.configService.getOrThrow<string>(key));
  }

  /**
   * Generates a JWT token with the given payload and expiration time.
   */
  private async generateJwtToken(
    payload: TokenPayload,
    secretKey: string,
    expiresInMs: number,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow(secretKey),
      expiresIn: `${expiresInMs}ms`,
    });
  }

  /**
   * Returns a Date object representing the expiration time.
   */
  private getExpirationDate(expirationMs: number): Date {
    return new Date(Date.now() + expirationMs);
  }

  /**
   * Hashes and stores the refresh token in the database.
   */
  private async storeHashedRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedToken = await hash(refreshToken, 10);
    await this.usersService.updateUser(
<<<<<<< HEAD
      { where: { id: userId } },
      { refreshToken: hashedToken },
=======
      { id: userId },
       { refreshToken: hashedToken },
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
    );
  }

  /**
   * Sets authentication cookies in the response.
   */
  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string | null,
    accessTokenExpiry: Date,
    refreshTokenExpiry: Date | null,
  ): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    response.cookie('Authentication', accessToken, {
      secure: isProduction,
      expires: accessTokenExpiry,
    });
<<<<<<< HEAD

=======
    
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
    if (refreshToken && refreshTokenExpiry) {
      response.cookie('RefreshToken', refreshToken, {
        httpOnly: isProduction,
        secure: isProduction,
        expires: refreshTokenExpiry,
      });
    }
  }
}
