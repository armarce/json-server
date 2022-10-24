
# JSON Server - entregable #1 (Academlo)




## Author

- [Armando M Ibarra Fernandez](https://www.github.com/octokatherine)


## API Reference



#### Get all tasks
https://json-server-production-6276.up.railway.app/apiv1/tasks/
```http
  GET /apiv1/tasks/
```

#### Post a task
https://json-server-production-6276.up.railway.app/apiv1/tasks/
```http
  POST /api/tasks/
```

#### Change data task
https://json-server-production-6276.up.railway.app/apiv1/task/{id}
```http
  PUT /api/task/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of task to data change |

#### Change status
https://json-server-production-6276.up.railway.app/apiv1/task/{id}
```http
  PATCH /api/task/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of task to status change |


#### Delete task
https://json-server-production-6276.up.railway.app/apiv1/task/{id}
```http
  DELETE /api/task/{id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of task to delete |
