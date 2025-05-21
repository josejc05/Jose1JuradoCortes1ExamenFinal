const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const ENTRIES_PATH = path.join(__dirname, 'entries.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/entries', (req, res) => {
    fs.readFile(ENTRIES_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer entradas' });
        }
        try {
            const entries = JSON.parse(data || '[]');
            res.json(entries);
        } catch (parseErr) {
            res.status(500).json({ error: 'Error al parsear JSON' });
        }
    });
});

app.post('/entries', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const newEntry = { title, content };

    fs.readFile(ENTRIES_PATH, 'utf8', (err, data) => {
        let entries = [];
        if (!err && data) {
            try {
                entries = JSON.parse(data);
            } catch {
            }
        }

        entries.push(newEntry);

        fs.writeFile(ENTRIES_PATH, JSON.stringify(entries, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir archivo:', err);
                return res.status(500).json({ error: 'Error al guardar entrada' });
            }
            res.status(201).json({ message: 'Entrada agregada correctamente' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
