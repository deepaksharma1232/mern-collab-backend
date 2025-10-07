module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('joinTeam', (teamId) => {
      socket.join(`team_${teamId}`);
    });

    socket.on('leaveTeam', (teamId) => {
      socket.leave(`team_${teamId}`);
    });

    socket.on('sendMessage', (msg) => {
      io.to(`team_${msg.teamId}`).emit('newMessage', msg);
    });

    socket.on('taskUpdated', (payload) => {
      io.to(`team_${payload.teamId}`).emit('taskUpdated', payload);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });
  });
};
