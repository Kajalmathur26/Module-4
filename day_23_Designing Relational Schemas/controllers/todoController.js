// controllers/todoController.js

// Create Todo
const createTodo = async (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !userId) return res.status(400).json({ error: "Title and userId required" });

  try {
    const supabase = req.supabase;

    // Check user exists
    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    if (!user) return res.status(404).json({ error: "User not found" });

    // Insert todo
    const { data, error } = await supabase.from('todos').insert([{ title, description, user_id: userId }]).select();
    if (error) throw error;

    res.status(201).json({ message: "Todo created", todo: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Todos by User
const getTodosByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const supabase = req.supabase;

    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    if (!user) return res.status(404).json({ error: "User not found" });

    const { data: todos, error } = await supabase.from('todos').select('*').eq('user_id', userId);
    if (error) throw error;

    res.json({ todos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, is_completed } = req.body;
  try {
    const supabase = req.supabase;

    const { data: existingTodo } = await supabase.from('todos').select('*').eq('id', todoId).single();
    if (!existingTodo) return res.status(404).json({ error: "Todo not found" });

    const { data, error } = await supabase
      .from('todos')
      .update({ title, description, is_completed })
      .eq('id', todoId)
      .select();

    if (error) throw error;
    res.json({ message: "Todo updated", todo: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    const supabase = req.supabase;

    const { data: existingTodo } = await supabase.from('todos').select('*').eq('id', todoId).single();
    if (!existingTodo) return res.status(404).json({ error: "Todo not found" });

    const { error } = await supabase.from('todos').delete().eq('id', todoId);
    if (error) throw error;

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTodo, getTodosByUser, updateTodo, deleteTodo };
