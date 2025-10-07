require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');

const app = express();
app.use(require('cors')());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
require('./src/utils/socket')(io);

connectDB(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err=>console.error(err));

app.use("/api/auth",  require('./src/routes/authRoutes.js'));
app.use("/api/teams",  require('./src/routes/teamRoutes.js'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/tasks', require('./src/routes/tasks'));
app.use('/api/messages', require('./src/routes/messages'));

app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on ${PORT}`));
