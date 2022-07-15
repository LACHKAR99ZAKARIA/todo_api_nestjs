import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {  } from "module";
import { CreateTodoDto } from 'src/interfaces/dto/create.todo.dto';
import { Todo } from 'src/interfaces/todos.interface';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosservice: TodosService) {}

    @Get(':id')
    findOne(@Param('id') id: string){
        console.log('id:', id);
        return this.todosservice.findOne(id);
    }
    
    @Get()
    findAll(): Todo[] {
        return this.todosservice.findAll();
    }

    @Post()
    createTodo(@Body() newTodo: CreateTodoDto){
        console.log('new Todo:', newTodo);
        this.todosservice.create(newTodo);
    }

    @Patch(':id')
    updateTodo(@Param('id') id:string,@Body() todo:CreateTodoDto){
        return this.todosservice.update(id,todo);
    }

    @Delete(':id')
    deletTodo(@Param('id') id:string){
        return this.todosservice.delet(id);
    }
}
