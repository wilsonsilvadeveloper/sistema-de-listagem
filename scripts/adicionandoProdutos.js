var produtos = [];

// resgatando dados do formulario
var nomeProduto = document.getElementById("AdicionarNomeProduto");
var categoriaProduto = document.getElementById("gruposCategorias");
var estoqueProduto = document.getElementById("adicionarEstoque");
var validadeProduto = document.getElementById("AdicionarValidade");


var alertSpan = document.getElementById('alertaProdutos');
var contadorDeProdutos = document.getElementById('prateleira');

var containerProdutos = document.getElementById('mostraProdutos');

if(localStorage.itens) {
    produtos = JSON.parse(localStorage.getItem('itens'));
} else {
    localStorage.itens = JSON.stringify(produtos);
}



function VerificaCampo() {
   if(nomeProduto.value == '' || validadeProduto.value == '' || categoriaProduto.value == '' || estoqueProduto.value == '') {
        alert('campo vazio')    
        return false;
    } else {
        return true;
    }
}

function adicionandoProduto() {
    var verificadorInputs = VerificaCampo();

    if(verificadorInputs == true) {

        var newProduto = {Nome: nomeProduto.value, Categorias: categoriaProduto.value, Estoque: estoqueProduto.value, Validade: validadeProduto.value};
        if(produtos.length == 0) {
            produtos.push(newProduto);
            localStorage.itens = JSON.stringify(produtos);
        } else {
            if(localStorage.itens) {
                produtos = JSON.parse(localStorage.getItem('itens'));

                if(produtos.find(p => p.Nome == newProduto.Nome)) {
                    alert('item já existe');
                } else {

                    if(newProduto.Categorias == 'Automoveis' || newProduto.Categorias == 'Acessorios Eletronicos' || newProduto.Categorias == 'Roupas' || newProduto.Categorias == 'Eletrodomesticos' || newProduto.Categorias == 'frutas' || newProduto.Categorias == 'Brinquedos' || newProduto.Categorias == 'Materias de Construçaõ') {
                        newProduto.Validade = 'Indefinido'
                        produtos.push(newProduto);
                        localStorage.itens = JSON.stringify(produtos);
                        alert('ok'); 
                        //window.location.reload();
                        return true;
                    } else if(newProduto.Categorias == 'selecione') {
                        alert('por favor selecione uma categoria');
                        return false;
                    } else {
                        produtos.push(newProduto);
                        localStorage.itens = JSON.stringify(produtos);
                        alert('ok'); 
                        //window.location.reload();
                        return true;
                    }
                }
            }
        }
        
    }

   
}

function imprimir() {
    
    if(localStorage.itens && produtos.length > 0) {
        //CaixaProdutos.style.display = 'flex';
        alertSpan.style.display = 'none';

       for(var i = 0; i < produtos.length && i < 7; i++) {
        var elementosDiv = document.createElement('div');
        elementosDiv.classList.add('produtos');

        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');

        p1.classList.add('detalhesProdutos');
        p2.classList.add('detalhesProdutos');
        p3.classList.add('detalhesProdutos');
        p4.classList.add('detalhesProdutos');

        p1.innerText = 'Nome: ' + produtos[i].Nome;
        p2.innerText = 'Categoria: ' + produtos[i].Categorias;
        p3.innerText = 'No Estoque: ' + produtos[i].Estoque;
        p4.innerText = 'Data de Validade: ' + produtos[i].Validade;
        
        elementosDiv.appendChild(p1);
        elementosDiv.appendChild(p2);
        elementosDiv.appendChild(p3);
        elementosDiv.appendChild(p4);

        containerProdutos.appendChild(elementosDiv);

        
       }
       
    
       console.log(containerProdutos);
       console.log(elementosDiv)
       console.log(p1, p2, p3, p4);
       
    } else {
        alertSpan.innerText = 'Estoque Vazio'
    }

    contadorDeProdutos.innerText += ' ' + produtos.length;
    
}


imprimir(); 



function AdicionarNewProduct() {
    var colocandoProdutoNaPrateleita = adicionandoProduto();
    if(colocandoProdutoNaPrateleita == true) {
        imprimir();
        fecharModal();
        window.location.reload();
    }
    
}