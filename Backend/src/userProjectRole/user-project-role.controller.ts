import { Body, Controller, Post } from '@nestjs/common';
import { UserProjectRoleService } from './user-project-role.service';
import { AssignRoleDto } from './dto/assign-role-dto';

@Controller('user-project-role')
export class UserProjectRoleController {
  constructor(private readonly uprService: UserProjectRoleService) {}

  @Post('assign')
  assign(@Body() dto: AssignRoleDto) {
    return this.uprService.assignRole(dto);
  }
}
