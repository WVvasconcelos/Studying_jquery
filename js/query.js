
/**
 * aqui estarei tentando melhorar costumes.
 * estarei explicando os motivos de fazer de uma determinada forma
 */

//primeiro estarei criando uma variável para buscar um elemento pelo ID

//var total = document.getElementById("total");
//alert(total.innerHTML); /*o alert irá servir para nos mostrar o valor, algo que pode ser feito também utilizando o console*/

/** 
 *aqui está sendo feita a conversão do texto para número, já que tudo no html é texto.
 *essa conversão se faz necessaria para poder reescrever no documento.
 */

moneyTextToFloat = function (text){
    var cleanText = text.replace("R$ ", "").replace(",", ".");
    return parseFloat(cleanText);
}
/*algo a se acrescentar é o uso do var, é possivel criar uma variavel sem a utilização dessa tag, entretanto, ao fazer isso estaremos alocando essa variavel no maior escopo possivel, além de ela estar sujeita a ser modificada em outro codigo, dando uma certa imprevisibilidade ao codigo*/

/*fazendo o oposto do código anterior, vamos pegar um valor e formatar ele para texto.*/

floatToMoneyText = function(value){
    var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
    text = "R$ " + text;
    return text.substr(0, text.length -2) + "," + text.substr(-2);
}
/**
 * acima foi-se usado a multiplicação por 100 e a função Math.floor para criar duas casas decimais.
 * ao utilizar Math.floor, estamos arredondando para baixo, casa queira arredondar para cima, é possivel utilizar o Math.ceiling.
 * depois foi-se utilizado o metodo substr para inserir a virgula.
 */

/*var total = document.getElementById("total");
var formattedText = floatToMoneyText(moneyTextToFloat(total.innerHTML)); //dessa forma conseguimos ver a diferença dos codigos.

alert(formattedText === total.innerHTML);
*/

readTotal = function(){
    var total = document.getElementById("total");
    return moneyTextToFloat(total.innerHTML);
}
/* a função readTotal irá servir para retornar um valor total, sem precisar repetir o codigo, mas para isso ainda precisamos de uma função para mudar o valor total*/

writeTotal = function(value){
    var total = document.getElementById("total");
    total.innerHTML = floatToMoneyText(value);
}
/*atraves do write, o valor total no nosso browser irá mudar a cada valor adicionado*/

/**
 * iremos agora usar classes para retornar alguns elementos
 * e encapsular elementos de preço e quantidade para os manter mais organizados e compactados
 */

 //var produtos = document.getElementsByClassName("produto");
 //console.log(produtos);
    calculateTotalProducts = function() {
    var produtos = document.getElementsByClassName("produto");
    var totalProdutos = 0;

    for(var pos = 0; pos < produtos.length; pos++) {
    var priceElements = produtos[pos].
    getElementsByClassName("price");
    var priceText = priceElements[0].innerHTML;
    var price = moneyTextToFloat(priceText);//usamos essa função para pegar apenas os valores para podermos somar futuramente

    var qtyElements = produtos[pos].
    getElementsByClassName("quantity");
    var qtyText = qtyElements[0].value;
    var quantity = moneyTextToFloat(qtyText);//o mesmo do anterior

    var subtotal = quantity * price;//aqui teremos o valor de cada componente do carrinho
    totalProdutos += subtotal;//depois o valor total de todos somados
    }
    return totalProdutos;
    }

    /*retornamos os valores para a função writeTotal, para que os valores possam ser alterados*/
        quantidadeMudou = function() {
        writeTotal(calculateTotalProducts());
        }


        /**
         * usamos o metodo onload para poder mudar a quantidade sempre que houver um evento de carregamento na pagina
         */
            onDocumentLoad = function() {
            var textEdits = document.getElementsByClassName("quantity");
            for(var i = 0; i < textEdits.length; i++) {
            textEdits[i].onchange = quantidadeMudou;
            }
            }

            window.onload = onDocumentLoad;
    