const mongoose = require('mongoose');
const app = require('./express');

const { MONGODB } = process.env;

// Conecta com o banco via variavel de ambiente
mongoose.connect(MONGODB, {
  autoReconnect: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  poolSize: 10,
});

app.listen(process.env.PORT, () => {
  console.log('Servidor iniciado na porta', process.env.PORT);
});
