const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mongodb://usuario:123@localhost:27017/seu-banco-de-dados', { useNewUrlParser: true, useUnifiedTopology: true });

const clienteSchema = new mongoose.Schema({
  nome: String,
  nome_lugar: String,
  local_pais: String,
  cidade: String,
  descricao: String,
});

const Cliente = mongoose.model('Cliente', clienteSchema);

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).send('Cliente criado com sucesso!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.send('Cliente deletado com sucesso!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put('/clientes/:id', async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
