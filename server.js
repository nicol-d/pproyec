const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'tareas_cilsa'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  console.log('Solicitud GET a /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para insertar una tarea
app.post('/agregarTarea', (req, res) => {
  const { tarea } = req.body;
  console.log('Datos recibidos:', req.body);
  const query = 'INSERT INTO tareas (nombre, estado_id) VALUES ( ?, 1)';
  db.query(query, [tarea], (err, result) => {
    if (err) {
      console.error('Error insertando tarea:', err);
      return res.status(500).send('Error insertando tarea');
    }
    console.log('Tarea insertada:', result);
    res.status(200).send('Tarea insertada');
  });
});
app.post('/eliminarTarea', (req, res) => {
    const { id } = req.body;
    console.log('Datos recibidos:', req.body);
    const query = 'DELETE FROM tareas WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error eliminada tarea:', err);
        return res.status(500).send('Error eliminada tarea');
      }
      console.log('Tarea eliminada:', result);
      res.status(200).send('Tarea insertada');
    });
  });
  

// Ruta para obtener todas las tareas
app.get('/obtenerTareas', (req, res) => {
  const query = 'SELECT * FROM tareas WHERE estado_id = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo tareas:', err);
      return res.status(500).send('Error obteniendo tareas');
    }
    res.status(200).json(results);
  });
});
// tareas en proceso
app.get('/obtenerTareasProceso', (req, res) => {
    const query = 'SELECT * FROM tareas WHERE estado_id = 2';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error obteniendo tareas:', err);
        return res.status(500).send('Error obteniendo tareas');
      }
      res.status(200).json(results);
    });
  });
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
// tareas realizadas
app.get('/obtenerTareasRealizadas', (req, res) => {
    const query ='SELECT * FROM tareas WHERE estado_id = 3';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error obteniendo tareas:', err);
        return res.status(500).send('Error obteniendo tareas');
      }
      res.status(200).json(results);
    });
  });


app.post('/actualizarEstadoProceso', (req, res) => {
    const { id } = req.body;
    console.log('Datos recibidos:', req.body);
    const query = 'UPDATE tareas SET estado_id = 2 WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error de base de dato:', err);
        return res.status(500).send('Error db');
      }
      console.log('En PRoceso:', result);
      res.status(200).send('En proceso');
    });
  });

  app.post('/actualizarEstadoRealizado', (req, res) => {
    const { id } = req.body;
    console.log('Datos recibidos:', req.body);
    const query = 'UPDATE tareas SET estado_id = 3 WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error de base de dato:', err);
        return res.status(500).send('Error db');
      }
      console.log('En PRoceso:', result);
      res.status(200).send('En proceso');
    });
  });