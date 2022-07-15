import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from 'src/interfaces/dto/create.todo.dto';
import { Todo } from 'src/interfaces/todos.interface';

@Injectable()
export class TodosService {
    todos: Todo[] =[
        {
            id:1,
            title:'bock 1',
            description:'description livre',
            dispo: true,
        },
        {
            id:2,
            title:'bock 2',
            description:'description livre 2',
            dispo: false,
        },
        {
            id:3,
            title:'bock 3',
            dispo: true,
        },
    ];
    findAll(): any[]{
        return this.todos;
    }
    findOne(id: string){
        return this.todos.find(todo => todo.id === Number(id));
    }
    create(todo: CreateTodoDto){
        this.todos=[...this.todos, todo as Todo];
    }
    update(id:string ,todo:Todo)
    {
        const TodoToUpdate= this.todos.find(t => t.id === +id);
        if(!TodoToUpdate)
        {
            return new NotFoundException(id,' Not Found');
        }
        if(todo.hasOwnProperty('title'))
        {
            TodoToUpdate.title=todo.title;
        }
        if(todo.hasOwnProperty('description'))
        {
            TodoToUpdate.description=todo.description;
        }
        if(todo.hasOwnProperty('dispo'))
        {
            TodoToUpdate.dispo=todo.dispo;
        }
        const updateTodo = this.todos.map(t=> t.id != +id ? t: TodoToUpdate);
        this.todos=[...updateTodo];
        return { updateTodo: 1, todo: updateTodo};
    }

    delet(id:string){
        const nbrOfTdosBefore= this.todos.length;
        this.todos=[...this.todos.filter(t=> t.id !== +id)];
        if(this.todos.length<nbrOfTdosBefore){
            return{ deletedtodos:1 , nbrOfTdos:this.todos.length};
        }
        else{
            return{ deletedtodos:0 , nbrOfTdos:this.todos.length};
        }
    }
}
