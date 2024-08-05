import { Todo } from '@atocha/oxioracle/util';
import { TodoDto } from './todo-dto.interface';

export function mapTodoDtoToTodo({
  id,
  userId,
  title,
  completed,
}: TodoDto): Todo {
  return {
    id: id.toString(),
    userId: userId.toString(),
    title,
    completed,
  };
}
