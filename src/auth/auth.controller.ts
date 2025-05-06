import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/dto/users.dto';
import { Public } from './public.decorator';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Endpoint para autenticar usuarios y obtener token JWT',
  })
  @ApiBody({
    type: UsersDto,
    examples: {
      success: {
        value: {
          username: 'usuario@ejemplo.com',
          password: 'contraseña123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
    schema: {
      example: {
        status: 400,
        message: 'Credenciales no proporcionadas',
      },
    },
  })
  signIn(@Body() signInDto: UsersDto) {
    if (!signInDto) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Credenciales no proporcionadas',
      };
    }
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
