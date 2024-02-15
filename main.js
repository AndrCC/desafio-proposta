const express = require("express");
const proposalRoutes = require("./adapters/proposalRoutes");
const port = 3003;

const app = express();
app.use(express.json());
app.use("/api/proposta", proposalRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
