const fs = require('fs').promises;
const path = require('path');
const Proposal = require('../domain/Proposal'); 

async function validateAndSaveProposals(propostas) {
    let validCount = 0;
    let invalidCount = 0;
    const validatedProposals = propostas.map(propostaData => {
        const proposal = new Proposal(propostaData.propostaId, propostaData.produto, propostaData.dataInicioVigencia, propostaData.dataFimVigencia);
        if (proposal.isValid()) {
            validCount++;
            return propostaData; 
        } else {
            invalidCount++;
            return null; 
        }
    }).filter(proposal => proposal !== null); 

    await fs.writeFile(path.join(__dirname, '..', 'json', 'proposals.json'), JSON.stringify(validatedProposals, null, 2));

    return { valid: validCount, invalid: invalidCount };
}

async function getProposalProduct(propostaId) {
    const data = await fs.readFile(path.join(__dirname, '..', 'json', 'proposals.json'), 'utf8');
    const propostas = JSON.parse(data);
    const proposal = propostas.find(p => p.propostaId === propostaId);
    if (!proposal) throw new Error('Proposta não encontrada');
    return proposal.produto;
}

module.exports = { validateAndSaveProposals, getProposalProduct };
