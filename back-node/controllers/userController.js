const bcrypt = require('bcryptjs'); // Importar bcryptjs para el hash y comparación de contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para crear y verificar tokens JWT
const { 
  createUser, 
  getUserByEmail, 
  getAllUsers, 
  getUserById,
  updateUserById,
  deleteUserById
} = require('../models/userModel'); // Importa la función para obtener mis modelos

// Controlador para crear un usuario
const createUserController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Generar salt y hash para la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario con el hash de la contraseña
    await createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controlador para iniciar sesión
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Contraseña proporcionada:', password);
    console.log('Hash de contraseña almacenado:', user.user_password_hash); // Usa user.user_password_hash

    const isPasswordValid = await bcrypt.compare(password, user.user_password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token y enviar respuesta
    const token = jwt.sign({ id: user.p_user_id, email: user.user_email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);

    res.status(200).json({ message: 'Autenticación exitosa', token: token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Controlador para obtener todos los usuarios
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controlador para obtener un usuario por ID
const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//Controlador para actualizar un usuario
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await updateUserById(id, username, email, hashedPassword);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Controlador para elimianar un usuario
const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUserById(id);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { createUserController, 
  loginUserController, 
  getAllUsersController, 
  getUserByIdController,
  updateUserController,
  deleteUserController  
};