import { Task } from './interface/task.interface';
import { TaskList } from '../interfaces/taskList.interface';

declare module 'fastify' {
  export interface FastifyRequest {
    Body: Task | TaskList;
  }
}