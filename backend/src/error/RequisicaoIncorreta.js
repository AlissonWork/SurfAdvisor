import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase{
    constructor(mensagem = "One or more of the provided data is incorrect."){
        super(mensagem, 400);
    }
}

export default RequisicaoIncorreta;
