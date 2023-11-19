import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import session from 'express-session';
import { sequelize } from './database/models';

dotenv.config();

const app = express();

app.use(
  session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Not Found",
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully");
    } catch (err) {
      console.log(`Database connection failed: ${err}`);
      process.exit(1);
    }
  };
  connectDB();
  console.log("App is now running at port ", port);
});
