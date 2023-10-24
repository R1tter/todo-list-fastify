import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient, Prisma } from '@prisma/client';
import * as yup from 'yup';

const prisma = new PrismaClient();

interface TaskParams {
  id: string;
}

// Validation schemas
const createTaskSchema = yup.object().shape({
  title: yup.string().required(),
  completed: yup.boolean(),
  listName: yup.string().nullable(),
});

const updateTaskSchema = yup.object().shape({
  title: yup.string(),
  completed: yup.boolean(),
  listName: yup.string().nullable(),
});

export async function tasksRoutes(fastify: FastifyInstance) {
  
  // GET: List all tasks
  fastify.get('/tasks', async (request: FastifyRequest, reply: FastifyReply) => {
    const tasks = await prisma.task.findMany();
    reply.send(tasks);
  });

  // POST: Create a new task
  fastify.post('/tasks', async (request: FastifyRequest, reply: FastifyReply) => {
    const taskData: Prisma.TaskCreateInput = request.body as Prisma.TaskCreateInput;

    // Validate the request data
    try {
      await createTaskSchema.validate(taskData);
    } catch (error) {
      reply.status(400).send(error);
      return;
    }

    const newTask = await prisma.task.create({ data: taskData });
    reply.send(newTask);
  });

  // PUT: Update a task
  fastify.put('/tasks/:id', async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
    const taskId: Prisma.TaskWhereUniqueInput = { id: request.params.id as string };
    const taskData: Prisma.TaskUpdateInput = request.body as Prisma.TaskUpdateInput;

    // Validate the request data
    try {
      await updateTaskSchema.validate(taskData);
    } catch (error) {
      reply.status(400).send(error);
      return;
    }

    const updatedTask = await prisma.task.update({
      where: taskId,
      data: taskData
    });
    reply.send(updatedTask);
  });

  // DELETE: Delete a task
  fastify.delete('/tasks/:id', async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
    const taskId: Prisma.TaskWhereUniqueInput = { id: request.params.id as string };
    const deletedTask = await prisma.task.delete({ where: taskId });
    reply.send(deletedTask);
  });
}
