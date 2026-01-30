// controllers/userController.js
const bcrypt = require('bcryptjs');
const { validateUserInput } = require('../validations/validation');

// Sign up a new user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!validateUserInput(name, email, password)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const supabase = req.supabase;

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "User created", user: data[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user (Cascade delete their todos)
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const supabase = req.supabase;

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user (todos will be deleted automatically because of ON DELETE CASCADE)
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) throw error;

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export both functions
module.exports = { signupUser, deleteUser };