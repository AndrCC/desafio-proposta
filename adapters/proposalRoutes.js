const express = require('express');
const proposalService = require('../application/proposalService');

const router = express.Router();

router.post("/validar", async (req, res) => {
  try {
    const result = await proposalService.validateAndSaveProposals(req.body.propostas);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:proposta/produto", async (req, res) => {
  try {
    const propostaId = parseInt(req.params.proposta, 10);
    const produto = await proposalService.getProposalProduct(propostaId);
    res.json({ produto });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
