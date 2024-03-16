let listaNumeroSorteado = [];
let limiteNumeroSorteado = 8;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function personalTag (tag, texto){
    let conteudo = document.querySelector(`${tag}`);
    conteudo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function exibirMensagemInicial (){
personalTag('h1','Jogo do número secreto');
personalTag('p','Escolha um número entre 1 e 10');
};

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*limiteNumeroSorteado+1);
    
    if (listaNumeroSorteado.length == limiteNumeroSorteado){
        listaNumeroSorteado = [];
    }

    if (listaNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumeroSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute==numeroSecreto){
        personalTag('h1','É isso Naomi!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número sercreto com ${tentativas} ${palavraTentativa}`
        personalTag('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if (chute > numeroSecreto){
            personalTag('p',' O número secreto é menor');
        }else {
            personalTag('p','O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
};

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
};
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disable',true)
}