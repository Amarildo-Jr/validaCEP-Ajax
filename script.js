let ajax;

function criarConexao() {
    try {
      ajax = new XMLHttpRequest();
    } catch (failed) {
          ajax = null;
    }

    if (ajax == null)
      alert("Erro ao criar uma conexão utilizando Ajax.");
}

function pesquisacep() {
    let cep = document.getElementById('cep').value.replace(/\D/g, '');
    criarConexao();

    url=`https://viacep.com.br/ws/${cep}/json/`
    ajax.open("GET", url, true);
    ajax.responseType = "json";
    console.log(url)
    
    if (cep != "") {
		  var validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)) {
        document.getElementById('rua').value=("...");
        document.getElementById('bairro').value=("...");
        document.getElementById('cidade').value=("...");
        document.getElementById('uf').value=("...");
        document.getElementById('ibge').value=("...");
        
        ajax.onreadystatechange = atualizaPagina;
      } else {
        limparFormulario();
        alert("Formato de CEP inválido.");
      }
    } else {
      limparFormulario();
      alert("Digite um CEP.");
    }
    ajax.send();
}

function limparFormulario() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function atualizaPagina() {
	const resposta = ajax.response;
  console.log(resposta)
	if (resposta == null) return;

	if (!resposta.erro) {
		document.getElementById('rua').value=(resposta.logradouro);
		document.getElementById('bairro').value=(resposta.bairro);
		document.getElementById('cidade').value=(resposta.localidade);
		document.getElementById('uf').value=(resposta.uf);
		document.getElementById('ibge').value=(resposta.ibge);
	} else {
		limparFormulario();
		alert("CEP não encontrado.");
	}
}