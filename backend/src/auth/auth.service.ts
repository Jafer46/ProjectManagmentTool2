import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDTO } from './dto/signupDto';
import { PrismaService } from 'src/common/prisma.Service';
import * as bycrypt from 'bcrypt';
import { LoginDTO } from './dto/loginDTO';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async singup(singupData: SignupDTO) {
    const { email, username, password } = singupData;
    console.log(password);

    const user = await this.prisma.user.findFirst({
      where: { email, username },
    });
    if (user) {
      throw new BadRequestException('Email or username in use');
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    singupData.password = hashedPassword;
    return await this.prisma.user.create({ data: singupData });
  }

  async login(credentials: LoginDTO) {
    const { email, password } = credentials;

    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Wrong Crendentials');
    }

    const mathedPassword = await bycrypt.compare(password, user.password);
    if (!mathedPassword) {
      throw new UnauthorizedException('Wrong Crendentials');
    }

    const tokenData = await this.generateUserToken(user.id);
    return { user, ...tokenData };
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
    return this.generateUserToken(token.userId);
  }

  private async generateUserToken(userId: number) {
    const accessToken = await this.jwtService.sign(
      { userId },
      { expiresIn: '1h' },
    );
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(refreshToken: string, userId: number) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    const data = {
      token: refreshToken,
      userId,
      expiryDate,
      user: {
        connect: { id: userId },
      },
    };
    return this.prisma.refreshToken.create({ data });
  }
}
