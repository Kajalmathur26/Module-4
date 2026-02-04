import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    if (!name || !email || !age || !location || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from('users')
      .insert([{ name, email, age, location, password: hashedPassword }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, age, location')
      .eq('name', name)
      .single();

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
