import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient, Prisma } from '@prisma/client';
import * as yup from 'yup';

const prisma = new PrismaClient();


interface ListParams {
  id: string;
}

// Validation schemas
const createListSchema = yup.object().shape({
  name: yup.string().required(),
});

const updateListSchema = yup.object().shape({
  name: yup.string(),
});


export async function taskListsRoutes(fastify: FastifyInstance) {
  
  // GET: List all task lists
  fastify.get('/taskLists', async (request: FastifyRequest, reply: FastifyReply) => {
    const taskLists = await prisma.taskList.findMany();
    reply.send(taskLists);
  });

  // POST: Create a new task list
  fastify.post('/taskLists', async (request: FastifyRequest, reply: FastifyReply) => {
    const listData: Prisma.TaskListCreateInput = request.body as Prisma.TaskListCreateInput;

    // Validate the request data
    try {
      await createListSchema.validate(listData);
    } catch (error) {
      reply.status(400).send(error);
      return;
    }

    const newList = await prisma.taskList.create({ data: listData });
    reply.send(newList);
  });

  // PUT: Update a task list
  fastify.put('/taskLists/:id', async (request: FastifyRequest<{ Params: ListParams }>, reply: FastifyReply) => {
    const listId: Prisma.TaskListWhereUniqueInput = { id: request.params.id };
    const listData: Prisma.TaskListUpdateInput = request.body as Prisma.TaskListUpdateInput;

    // Validate the request data
    try {
      await updateListSchema.validate(listData);
    } catch (error) {
      reply.status(400).send(error);
      return;
    }

    const updatedList = await prisma.taskList.update({
      where: listId,
      data: listData
    });
    reply.send(updatedList);
  });

  // DELETE: Delete a task list
  fastify.delete('/taskLists/:id', async (request: FastifyRequest<{ Params: ListParams }>, reply: FastifyReply) => {
    const listId: Prisma.TaskListWhereUniqueInput = { id: request.params.id };
    const deletedList = await prisma.taskList.delete({ where: listId });
    reply.send(deletedList);
  });
}
