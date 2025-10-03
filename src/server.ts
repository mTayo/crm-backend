import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

