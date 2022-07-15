export class CreateTodoDto{
    readonly id: number;
    title: string;
    dispo: boolean;
    description?: string;
}