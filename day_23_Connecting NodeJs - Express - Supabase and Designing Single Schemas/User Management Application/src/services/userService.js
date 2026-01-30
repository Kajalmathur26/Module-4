import supabase from '../config/supabaseClient.js';

/**
 * Find a user by email
 * Returns the user object or null if not found
 */
export const findUserByEmail = async (email) => {
  try {
    const result = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!result) return null; // Supabase returned nothing
    const { data, error } = result;
    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error in findUserByEmail:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error in createUser:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error in getAllUsers:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Get a single user by ID
 */
export const getUserById = async (id) => {
  try {
    const result = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!result) return null; // user not found
    const { data, error } = result;
    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error in getUserById:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Update a user by ID
 */
export const updateUser = async (id, userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error in updateUser:", err.message);
    throw new Error(err.message);
  }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error in deleteUser:", err.message);
    throw new Error(err.message);
  }
};
