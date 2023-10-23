import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

const app = fastify()

app.register(fastifyCors, {
  origin: '*', //not ideal, but temporary
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('listening on port 3333)');
})