import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProjectRole } from './user-project-role.entity';
import { AssignRoleDto } from './dto/assign-role-dto';
import { User } from 'src/users/users.entity';
import { Project } from 'src/projects/projects.entity';
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class UserProjectRoleService {
  constructor(
    @InjectRepository(UserProjectRole)
    private uprRepository: Repository<UserProjectRole>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async assignRole(dto: AssignRoleDto): Promise<UserProjectRole> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    const project = await this.projectRepository.findOneBy({
      id: dto.projectId,
    });
    const role = await this.roleRepository.findOneBy({ value: dto.roleValue });

    if (!user || !project || !role) {
      throw new NotFoundException('Пользователь, проект или роль не найдены');
    }

    const existing = await this.uprRepository.findOne({
      where: { user: { id: user.id }, project: { id: project.id } },
      relations: ['role'],
    });

    if (existing) {
      // обновим роль
      existing.role = role;
      return this.uprRepository.save(existing);
    }
    const newLink = this.uprRepository.create({ user, project, role });
    return this.uprRepository.save(newLink);
  }
}
