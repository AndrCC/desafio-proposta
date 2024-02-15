const express = require("express");
const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const port = 3003;
console.log("Starting app on port:", port);
const app = express();

app.use(express.json());

app.post("/api/proposta/validar", function (req, res) {

    const proposals = req.body.propostas;

    console.log("propostas received:", JSON.stringify(proposals));

    const result = utils.saveFileValidProposals('./json/proposals.json', proposals);

    console.log("result:", JSON.stringify(result));
    res.json(result);

})

app.get("/api/proposta/:proposta/produto", (req, res) => {
    const propostaId = parseInt(req.params.proposta, 10);
    fs.readFile(path.join(__dirname, 'json', 'proposals.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao ler o arquivo de propostas' });
            return;
        }

        const propostas = JSON.parse(data);
        const proposta = propostas.find(p => p.propostaId === propostaId);

        if (!proposta) {
            res.status(404).json({ error: 'Proposta não encontrada' });
            return;
        }

        res.json({ produto: proposta.produto });
    });
});

app.listen(port);
