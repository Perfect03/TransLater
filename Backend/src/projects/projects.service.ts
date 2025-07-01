import { Injectable, Inject } from '@nestjs/common';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private fileService: FilesService
  ) {}

  async createProject(dto: CreateProjectDto, logo: any) {
    const fileName = await this.fileService.createFile(logo)
    const project = await this.projectRepository.create({...dto, logo: fileName});
    return this.projectRepository.save(project)
  }

  async getAllProjects() {
    const projects = this.projectRepository.find();
    return projects
  }
}
