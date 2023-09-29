import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
dotenv.config();

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Not Found',
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port);
});
