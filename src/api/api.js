const express = require('express');
const app = express();
const port = 3000; // Defina sua porta aqui

// Defina seus dados de trabalho como um array de objetos
const trabalhos = [
  {
    titulo: "Trabalho 1",
    texto: "Descrição do trabalho 1",
    imagem: "link_imagem_trabalho_1",
    link: "link_para_o_trabalho_1"
  },
  {
    titulo: "Trabalho 2",
    texto: "Descrição do trabalho 2",
    imagem: "link_imagem_trabalho_2",
    link: "link_para_o_trabalho_2"
  },
  // ... Adicione mais trabalhos aqui
];

// Rota para buscar todos os trabalhos
app.get('/trabalhos', (req, res) => {
  res.json(trabalhos);
});

// Rota para buscar um trabalho específico por ID (opcional)
app.get('/trabalhos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const trabalho = trabalhos.find(trabalho => trabalho.id === id);

  if (!trabalho) {
    res.status(404).send('Trabalho não encontrado');
    return;
  }

  res.json(trabalho);
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
