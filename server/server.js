import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const app = express();

app.use(express.json());
app.listen(5000, () => {
  console.log('listening on port 5000');
});
