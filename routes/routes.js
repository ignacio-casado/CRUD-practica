const express = require('express');
const router = express.Router();
const connection = require('../db');


router.use(express.static('public'))



router.get('/agregar', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});
  

router.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM Usuarios', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
router.get('/usuarios/:id', (req, res) => {
    const paramId = req.params.id;
    const query = 'SELECT * FROM Usuarios WHERE idUsuario = ?';

    connection.query(query, [paramId], (error, results, fields) => {
        if (error) throw error;
        
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
})


router.post('/agregar', (req, res) => {
    const { nombre, apellido, edad } = req.body;

    if (!nombre || !apellido || !edad) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    const query = 'INSERT INTO Usuarios (Nombre, Apellido, Edad) VALUES (?, ?, ?)';
    const values = [nombre, apellido, edad];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar en la base de datos:', error);
            return res.status(500).send('Error al procesar la solicitud.');
        }
        res.send('Datos agregados exitosamente.');
    });
});

router.delete('/eliminar/:id', (req, res) => {
    const paramId = req.params.id;
    const query = 'DELETE FROM Usuarios WHERE idUsuario = ?';

    connection.query(query, [paramId], (error, results, fields) => {
        if (error) throw error;
        
        if (results.affectedRows > 0) {
            res.json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});



module.exports = router;
