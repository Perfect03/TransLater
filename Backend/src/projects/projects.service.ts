import { Injectable, Inject } from '@nestjs/common';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { FilesService } from 'src/files/files.service';
import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private fileService: FilesService
  ) { }

  async createProject(dto: CreateProjectDto, logo: any) {
    const fileName = await this.fileService.createFile(logo)
    let slug = slugify(dto.name, { lower: true, strict: true, trim: true })
    const exists = await this.projectRepository.findOne({ where: { slug } })
    if (exists) {
      slug = `${slug}-${Date.now()}`
    }

    const project = await this.projectRepository.create({ ...dto, logo: fileName, slug: slug });
    return this.projectRepository.save(project)
  }

  async getAllProjects() {
    const projects = this.projectRepository.find();
    return projects
  }
}
