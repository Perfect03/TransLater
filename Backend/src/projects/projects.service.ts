import { Injectable, Inject } from '@nestjs/common';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(dto: CreateProjectDto) {
    const project = this.projectRepository.create(dto);
    return this.projectRepository.save(project)
  }

  async getAllProjects() {
    const projects = this.projectRepository.find();
    return projects
  }
}
