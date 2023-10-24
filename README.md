# Todo List API with Fastify and Prisma

This project is a simple Todo List API built using Fastify and Prisma. It allows users to manage tasks and task lists.

## Features

- List all tasks
- Create a new task
- Update a task
- Delete a task
- List all task lists
- Create a new task list
- Update a task list
- Delete a task list

## Getting Started

### Prerequisites

- Node.js
- Prisma CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/R1tter/todo-list-fastify.git
```

2. Navigate to the project directory:
```bash
cd todo-list-fastify
```

3. Install the dependencies:
```bash
npm install
```

4. Run the migrations to set up the database:
```bash
npx prisma migrate dev
```

5. Start the server:
```bash
npm start
```

The server will be running on `http://localhost:3333`.

## API Endpoints

### Tasks

- `GET /tasks`: List all tasks
- `POST /tasks`: Create a new task
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

### Task Lists

- `GET /taskLists`: List all task lists
- `POST /taskLists`: Create a new task list
- `PUT /taskLists/:id`: Update a task list
- `DELETE /taskLists/:id`: Delete a task list

## Testing

You can use tools like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test the API endpoints.

### Testing Routes

1. **Add a New Task**:
   - **Method**: POST
   - **Endpoint**: `/tasks`
   - **Body**:
     ```json
     {
       "title": "Test Task"
     }
     ```

2. **List All Tasks**:
   - **Method**: GET
   - **Endpoint**: `/tasks`

3. **Update a Task**:
   - **Method**: PUT
   - **Endpoint**: `/tasks/:taskId` (Replace `:taskId` with the actual ID of the task you want to update.)
   - **Body**:
     ```json
     {
       "title": "Updated Task",
       "completed": true
     }
     ```

4. **Delete a Task**:
   - **Method**: DELETE
   - **Endpoint**: `/tasks/:taskId` (Replace `:taskId` with the actual ID of the task you want to delete.)

You can use these JSON examples as a reference when testing your routes in Insomnia or Postman. Make sure to replace placeholders like `:taskId` with actual values when testing.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
