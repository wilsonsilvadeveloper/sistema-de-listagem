var produtosProcurados = [];

var barraDePesquisa = document.getElementById('pesquisa');
var divPesquisa = document.getElementById('produtosPesquisados');
var caixaDeAviso = document.getElementById('alertPesquisa');

function pegarProdutos() {
    if(localStorage.itens) {
        produtosProcurados = JSON.parse(localStorage.getItem('itens'))
    }
}

function buscarProduto() {
    var produtoSolicitado = produtosProcurados.find((p) => {
        caixaDeAviso.style.display = 'flex';
        

        if(barraDePesquisa.value == p.Nome) {
            imrpimirProduto(p)
            caixaDeAviso.innerText = 'Produto encontrado no estoque';
            divPesquisa.style.display = 'flex';
            //return p;
        } else {
            caixaDeAviso.innerText = 'Produto fora do estoque';
            divPesquisa.style.display = 'none';
        }
    })
}

function imrpimirProduto(pr) {

    var imprimirProduto = document.getElementById("nomeProdutoPesquisado");
    var imprimirCategoria = document.getElementById("categoriaPesquisada");
    var imprimirEstoque = document.getElementById("estoquePesquisado");
    var imprimirValidade = document.getElementById("validadePesquisada");

    imprimirProduto.innerText += ' ' + pr.Nome;
    imprimirCategoria.innerText += ' ' + pr.Categorias;
    imprimirEstoque.innerText += ' ' + pr.Estoque;
    imprimirValidade.innerText += ' ' + pr.Validade;

}

function pesquisa() {
    pegarProdutos();
    buscarProduto();
}
