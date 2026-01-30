// src/controllers/userController.js

import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import * as userService from '../services/userService.js';

export const createUser = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, age, role } = req.body;

    // Check if email exists
    const { data: existingUser, error: findError } = await userService.findUserByEmail(email);
    if (findError) throw findError;
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data, error: createError } = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      age,
      role
    });

    if (createError) throw createError;
    if (!data || data.length === 0) throw new Error('Failed to create user');

    res.status(201).json({ user: data[0] });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { data, error } = await userService.getAllUsers();
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { data, error } = await userService.getUserById(req.params.id);
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'User not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);

    const { data, error } = await userService.updateUser(req.params.id, updates);
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(data[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { error } = await userService.deleteUser(req.params.id);
    if (error) throw error;

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
