const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const PORT = process.env.PORT || 80;
const DB = "./db.json";
const filePath = path.resolve(DB);

async function getTasks(){

  try{

    let data = await fs.readFile(filePath, "utf-8");
    data = JSON.parse(data)

    if(Array.isArray(data)){
      
      data = data.sort((a, b) => a.id - b.id);

    }else{

      data = [];

    }

    return data;

  }catch(error){
    
    console.log(error);
    return [];

  }

}

async function fileWrite(dataJSON){

  try{

    await fs.writeFile(filePath, JSON.stringify(dataJSON));

  }catch(error){

    console.log(error);

  }

}

const getId = url => Number(url.split("/").at(-1));

const bodyMethods = {
  POST: {
    status: 201,
    url: "/apiv1/tasks/",
    fn: async(tasks, body) => {
      
      const newTask = body;
      newTask.id = tasks?.length > 0 ? tasks.at(-1).id + 1 : 1;
      tasks.push(newTask);

      await fileWrite(tasks);

    }
  },
  PATCH: {
    status: 200,
    url: "/apiv1/task/",
    fn: async(tasks, body, id) => {
      
      tasks = tasks.map(task => {

        if(task.id == id){

          task.status = body.status;

        }

        return task;

      });

      await fileWrite(tasks);

    }
  },
  PUT: {
    status: 200,
    url: "/apiv1/task/",
    fn: async(tasks, body, id) => {
      
      tasks = tasks.map(task => {

        if(task.id == id){

          task = body;
          task.id = id;

        }

        return task;

      });

      await fileWrite(tasks);

    }  
  }
};

const noBodyMethods = {
  GET: {
    status: 200,
    url: "/apiv1/tasks/",
    fn: tasks => tasks
  },
  DELETE: {
    status: 201,
    url: "/apiv1/task/",
    fn: async(tasks, id) => {
      tasks = tasks.filter(task => Number(task.id) != id);
      await fileWrite(tasks);
    }
  }
}

const app = http.createServer( async(req, res) => {

  const {url, method} = req;
  const tasks = await getTasks();

  if (Object.keys(bodyMethods).includes(method) && url.includes(bodyMethods[method].url)) {
    
    res.writeHead(bodyMethods[method].status, {"Content-Type": "application/json"});
    
    req.on("data", async(body) => {

      await bodyMethods[method].fn(tasks, JSON.parse(body), getId(url));
      
    });

  }else if(Object.keys(noBodyMethods).includes(method) && url.includes(noBodyMethods[method].url)){
  
    res.writeHead(noBodyMethods[method].status, {"Content-Type": "application/json"});
    const jsonData = await noBodyMethods[method].fn(tasks, getId(url));
    if(jsonData) res.write(JSON.stringify(jsonData));

  }else{

    res.writeHead(503);

  }

  res.end();
  
});

app.listen(PORT, () => console.log(`server on port ${PORT}`));

/*

[
    {
        "title": "Json server",
        "description": "Terminar Json server",
        "status": true,
        "id": 1
    }
]

*/