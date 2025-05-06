import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status-dto';
import { Public } from '../auth/public.decorator';
import { UpdateStatus } from './interfaces/update-status-interfaces';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(readonly UserServices: UsersService) { }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios encontrada',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '04F3E4E0-0DEE-EF11-9016-00155D15FB00',
          },
          name: {
            type: 'string',
            example: 'Daniel Gonzalez',
          },
          email: {
            type: 'string',
            example: 'dan.gonzalez@tiendasdaka.com',
          },
          password: {
            type: 'string',
            example: 'Daka2025',
          },
          confirmPassword: {
            type: 'string',
            example: 'Daka2025',
          },
          roles: {
            type: 'string',
            example: '0',
          },
          status: {
            type: 'string',
            example: '1',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-02-18T15:34:45.683Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-02-20T14:58:00.300Z',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron usuarios',
    schema: {
      type: 'array',
      example: [],
    },
  })
  @Get()
  async findAll() {
    return this.UserServices.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario por email' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '04F3E4E0-0DEE-EF11-9016-00155D15FB00',
        },
        name: {
          type: 'string',
          example: 'Daniel Gonzalez',
        },
        email: {
          type: 'string',
          example: 'dan.gonzalez@tiendasdaka.com',
        },
        password: {
          type: 'string',
          example: 'Daka2025',
        },
        confirmPassword: {
          type: 'string',
          example: 'Daka2025',
        },
        roles: {
          type: 'string',
          example: '0',
        },
        status: {
          type: 'string',
          example: '1',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-18T15:34:45.683Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-20T14:58:00.300Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'array',
      example: [],
    },
  })
  @Get('by-email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.UserServices.findOne(email);
  }

  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '04F3E4E0-0DEE-EF11-9016-00155D15FB00',
        },
        name: {
          type: 'string',
          example: 'Daniel Gonzalez',
        },
        email: {
          type: 'string',
          example: 'dan.gonzalez@tiendasdaka.com',
        },
        password: {
          type: 'string',
          example: 'Daka2025',
        },
        confirmPassword: {
          type: 'string',
          example: 'Daka2025',
        },
        roles: {
          type: 'string',
          example: '0',
        },
        status: {
          type: 'string',
          example: '1',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-18T15:34:45.683Z',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-20T14:58:00.300Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'array',
      example: [],
    },
  })
  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.UserServices.findOneById(id);
  }

  /**
   * Registra un nuevo usuario en el sistema
   * @param createUserDto Datos del nuevo usuario
   * @returns Objeto con el estado de la operación y datos/mensaje
   */
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Tws' },
        email: { type: 'string', example: 'd.marcsano@tiendasdaka.com' },
        password: { type: 'string', example: '*Alicedev94-' },
        confirmPassword: { type: 'string', example: '*Alicedev94-' },
        roles: { type: 'string', example: '1' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario registrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el registro',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'El correo ya está registrado' },
      },
    },
  })
  @Public()
  @Post('auth/signup')
  async save(@Body() createUserDto: CreateUserDto) {
    const { email, password, confirmPassword } = createUserDto;

    const isNewUser: string[] = await this.UserServices.findOne(email);

    if (isNewUser[0] !== null) {
      return {
        success: false,
        message: 'El correo ya está registrado',
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'Las contraseñas no coinciden',
      };
    }

    try {
      const newUser = await this.UserServices.save(createUserDto);
      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al crear el usuario',
        error: error.message,
      };
    }
  }

  @ApiOperation({ summary: 'Actualizar datos de usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Daniel Gonzalez Updated' },
        email: { type: 'string', example: 'dan.gonzalez@tiendasdaka.com' },
        password: { type: 'string', example: 'NuevaContraseña2025' },
        roles: { type: 'string', example: '1' },
        status: { type: 'string', example: '1' },
      },
    },
    description: 'Campos opcionales para actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        generatedMaps: {
          type: 'array',
          example: [],
        },
        affected: {
          type: 'number',
          example: 1,
          description: '1 si se actualizó, 0 si no se encontró el usuario',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud',
  })
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    try {
      return await this.UserServices.update(updateUserDto, id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else if (
        error.name === 'NotFoundError' ||
        error.message.includes('Not Found')
      ) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (
        error.name === 'BadRequestError' ||
        error.message.includes('Bad Request')
      ) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      } else {
        console.error('Error updating user:', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({ summary: 'Activar/Desactivar usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['status'],
      properties: {
        status: {
          type: 'string',
          example: '0',
          description: 'Estado del usuario: "1" activo, "0" inactivo',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Estado del usuario actualizado',
    schema: {
      type: 'object',
      properties: {
        generatedMaps: {
          type: 'array',
          example: [],
        },
        affected: {
          type: 'number',
          example: 1,
          description: '1 si se actualizó, 0 si no se encontró el usuario',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la solicitud - Status inválido',
  })
  @Patch('disable/:id')
  async disable(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateStatusDto,
  ) {
    return this.UserServices.disable(updateUserDto, id);
  }
}
