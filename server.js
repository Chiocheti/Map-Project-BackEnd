require('dotenv').config();
const cors = require('cors');
const express = require('express');

const routes = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MAPING serve status: ON' });
});

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Maping server is listening on the port -> ${process.env.PORT}`);
});
