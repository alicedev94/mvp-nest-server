import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity'; // Import your Role entity
import { RolesController } from './roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // <-- This is the crucial line
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], //If you need to use the service in other modules
})
export class RolesModule {}
