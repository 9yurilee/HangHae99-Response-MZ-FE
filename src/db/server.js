const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

server.use(middlewares);

server.delete('/todos/completed', (req, res) => {
    // lowdb를 사용해서 db.json에서 completed: true인 todo를 제거
    db.get('todos')
      .remove({ completed: true })
      .write();
  
    // todos를 응답
    res.send(db.get('todos').value());
  })
  
  // Use default router
  server.use(router);
  
  let port = 3001;
  server.listen(port, () => {
    console.log('JSON Server is running')
  });