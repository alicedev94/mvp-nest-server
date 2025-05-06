import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/token.dto';
import { User } from '../users/interfaces/user';
import { UserRequestBody } from './interfaces/user-request-body';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async singUp(
    name: string,
    email: string,
    password: string,
    roles: string[],
  ): Promise<unknown> {
    return {
      Nombre: name,
      Correo: email,
      Contraseña: password,
      Permisos: roles,
    };
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<AccessTokenDto | undefined> {
    const user: any = await this.usersService.findOne(username);

    if (!user[0]?.password || user[0].password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user[0].id,
      email: user[0].email,
      username: user[0].username,
      name: user[0].name,
      roles: user[0].roles,
      sucursal: user[0].id_sucursal,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
      isActive: user[0].isActive,
    };

    try {
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      console.log(error)
      return error
    }

  }
}
