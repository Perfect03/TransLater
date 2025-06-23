import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './projects.entity';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {

    constructor(private projectService: ProjectsService) {

    }

    @ApiOperation({summary: 'Добавление проекта в список'})
    @ApiResponse({status: 200, type: Project})
    @Post()
    create(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto)
    }

    @ApiOperation({summary: 'Получение всех проектов'})
    @ApiResponse({status: 200, type: [Project]})
    @Get()
    getAll() {
        return this.projectService.getAllProjects()
    }
}
