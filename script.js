let ajax;

function criarConexao() {
    try {
      ajax = new XMLHttpRequest();
    } catch (trymicrosoft) {
      try {
        ajax = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (othermicrosoft) {
        try {
          ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (failed) {
          ajax = null;
        }
      }
    }

    if (ajax == null)
      alert("Error creating request object!");
}

function pesquisacep() {
    let cep = document.getElementById('cep').value.replace(/\D/g, '');
    criarConexao();

    document.getElementById('rua').value=("...");
    document.getElementById('bairro').value=("...");
    document.getElementById('cidade').value=("...");
    document.getElementById('uf').value=("...");
    document.getElementById('ibge').value=("...");

    url=`https://viacep.com.br/ws/${cep}/json/`
    ajax.open("GET", url, true);
    ajax.responseType = "json";
    console.log(url)
    ajax.onreadystatechange = atualizaPagina;
    ajax.send();
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function atualizaPagina() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        const resposta = ajax.response;
        document.getElementById('rua').value=(resposta.logradouro);
        document.getElementById('bairro').value=(resposta.bairro);
        document.getElementById('cidade').value=(resposta.localidade);
        document.getElementById('uf').value=(resposta.uf);
        document.getElementById('ibge').value=(resposta.ibge);
    }
}