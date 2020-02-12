import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1'; 
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
 
    private tasks: Task[] = [];
    
    getAllTasks(){
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto){

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string){        
        const found = this.tasks.find(x => x.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} not found!`);
        }

        return found;
    }

    deleteTask(id: string): void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto) {
        
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search)
            );
        }

        return tasks;
    }
}
