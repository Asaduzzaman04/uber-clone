import http from 'http';
import app from './app.js';
import connectDB from './db/db.js';
//create a server
const server = http.createServer(app);

//set the port
const port = process.env.PORT || 5000;

//listen for requests
server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
