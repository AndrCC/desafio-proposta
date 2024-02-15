class Proposal {
    constructor(propostaId, produto, dataInicioVigencia, dataFimVigencia) {
        this.propostaId = propostaId;
        this.produto = produto;
        this.dataInicioVigencia = dataInicioVigencia;
        this.dataFimVigencia = dataFimVigencia;
    }

    isValid() {
        const proposalString = String(this.propostaId);
        const nrVersaoOferta = this.produto.nrVersaoOferta;
        const digits = proposalString.slice(0, 8).split('').map(Number); 
        let sumEven = 0, sumOdd = 0;

        digits.forEach(digit => {
            if (digit % 2 === 0) {
                sumEven += digit;
            } else {
                sumOdd += digit;
            }
        });

        let difference = sumEven - sumOdd;
        let verifyCode = Math.round(Math.abs(difference) / 2);

        return nrVersaoOferta === verifyCode;
    }
}

module.exports = Proposal;
