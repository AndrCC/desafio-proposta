const fs = require('fs');

const validateProposalId = (proposal) => {
    proposal = String(proposal);

    // String convertida para número. String estava gerando comparação de tipo incorreta
    const code = parseInt(proposal.substring(proposal.length - 2), 10);

    // Convertendo dígitos de string para número antes da soma.
    const digits = proposal.substring(0, proposal.length - 2).split("").map(Number);
    let sumEven = 0, sumOdd = 0;

    digits.forEach((element) => {
        if (element % 2 === 0) sumEven += element;
        else sumOdd += element;
    });
    
    //Usando Math.abs para garantir positividade.
    let verifyCode = Math.round(Math.abs(sumEven - sumOdd) / 2);

    return code === verifyCode;
};



const saveFileProposals = (path, proposals) => {

    let countValid = 0;
    let countInvalid = 0;

    proposals.forEach(element => {
        let verifyCode = "00" + element.produto.nrVersaoOferta
        let proposal = element.propostaId + verifyCode.substring(verifyCode.length - 2);
        if (validateProposalId(proposal)) {
            console.log("proposal:", proposal, "Valid");
            countValid++;
        } else {
            console.log("proposal:", proposal, "Invalid");
            countInvalid++;
        }
    })

    fs.writeFileSync(path, JSON.stringify(proposals));

    console.log("valid:", countValid, "invalid:", countInvalid);
    return {
        valid: countValid,
        invalid: countInvalid
    }
}

module.exports.validateProposalId = validateProposalId;
module.exports.saveFileValidProposals = saveFileProposals;