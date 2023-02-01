
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/use.js';

import ClasseRoutes from './routes/classe.js';

import AbsenceRoutes from './routes/absence.js';

import NotesRoutes from './routes/notes.js';
const app = express();

const port = process.env.PORT || 5000;
dotenv.config();
mongoose.set('debug', true);
export const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(express.json());

app.use('/user', userRoutes);

app.use('/notes', NotesRoutes);

app.use('/classe', ClasseRoutes);

app.use('/absence', AbsenceRoutes);

app.listen(port,() => {
  connect();
  console.log("im connected")
});