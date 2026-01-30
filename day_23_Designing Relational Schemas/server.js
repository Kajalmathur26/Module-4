require('dotenv').config();
const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Make supabase available in requests
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
