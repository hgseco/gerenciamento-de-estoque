const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = 3000;
const BASEDADOS = path.join (__dirname, "banco.txt");
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/api/public', async (requisicao, resposta)  =>{
    try{
    const produtos = await lerBaseDeDados();
    resposta.json(produtos);
    } catch (erro){
        console.error("Não foi possivel acessar o Banco de Dados:" + erro);
        resposta.status(500).send("Não foi possivel carregar os produtos.");
    }
});

async function lerBaseDeDados() {
    const dados = (await fs.promises.readFile(BASEDADOS, "utf-8"))
                                .trim()
                                .split(/\r?\n/);
    const produtos = [];
    dados.forEach(dado => {
        produtos.push(new produtos(dado));
    });
    return produtos;
}

function Produtos(dado){
    const propriedades = dados.split('|');
    const prod = [];
    propriedades.forEach(propriedades => {
        const valores = propriedades.split(':');
        prod[valores[0].trim()] = valores[1].trim();
    });
    this.nome = prod.nome;
    this.preco = Number.parseFloat(prod.preco);
    this.estoque = Number.parseInt(prod.estoque);
}
