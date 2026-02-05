import supabase from '../config/supabase.js';

/**
 * CREATE TODO
 */
export const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const { data, error } = await supabase
        .from('todos')
        .insert([
            {
                title,
                completed: false,
                user_id: req.user.userId
            }
        ])
        .select();

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(201).json(data[0]);
};

/**
 * GET USER TODOS
 */
export const getTodos = async (req, res) => {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('userId', req.user.userId);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(200).json(data);
};

/* UPDATE TODO (ONLY OWNER)*/
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const { data, error } = await supabase
        .from('todos')
        .update({ title, completed }) // 🔐 SAFE UPDATE
        .eq('id', id)
        .eq('userId', req.user.userId)
        .select();

    if (error || data.length === 0) {
        return res.status(403).json({ message: 'Not authorized to update this todo' });
    }

    res.status(200).json(data[0]);
};

/* DELETE TODO (ONLY OWNER)*/
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('userId', req.user.userId)
        .select();

    if (error || data.length === 0) {
        return res.status(403).json({ message: 'Not authorized to delete this todo' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
};
