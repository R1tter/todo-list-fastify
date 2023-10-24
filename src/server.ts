import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

import { tasksRoutes } from './routes/tasks';
import { taskListsRoutes } from './routes/taskLists';


const app = fastify()

app.register(fastifyCors, {
  origin: '*', //not ideal, but temporary
})

app.register(tasksRoutes);
app.register(taskListsRoutes);


app.listen({
  port: 3333,
}).then(() => {
  console.log('listening on port 3333)');
})