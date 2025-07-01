import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './projects.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {

    constructor(private projectService: ProjectsService) {

    }

    @ApiOperation({summary: 'Добавление проекта в список'})
    @ApiResponse({status: 200, type: Project})
    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    create(@Body() projectDto: CreateProjectDto, @UploadedFile() logo) {
        return this.projectService.createProject(projectDto, logo)
    }

    @ApiOperation({summary: 'Получение всех проектов'})
    @ApiResponse({status: 200, type: [Project]})
    @Get()
    getAll() {
        return this.projectService.getAllProjects()
    }
}
