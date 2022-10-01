### Short description

This project is a simple node.js express application with user management (CRUD).
MongoDB as database, Mongoose as ORM, Docker as deployment engine.

In this app you will be granted with the initial admin user:
```json
{
  "username": "admin",
  "password": "password",
  "role": "admin"
}
```

You can sign in to the app by entering credentials above.

### Existed routs

1. Users CRUD.
2. Auth route.

### How to start

Build and run docker instance:
```
 docker-compose build
 docker-compose up
```

Create file ".env" and fill it with data like in ".env-example" file.
