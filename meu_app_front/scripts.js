/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  
  let url = 'http://127.0.0.1:5000/estacionamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {      
      data.estacionamentos.forEach(item => insertList(item.id, item.placa, item.veiculo, formatarDataHora(item.data_hora_entrada), formatarDataHora(item.data_hora_saida), formatMoney(item.valor)))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPlaca, inputVeiculo, inputDataHoraEntrada, inputDataHoraSaida, inputPrice) => {
  const formData = new FormData();
  formData.append('placa', inputPlaca);
  formData.append('veiculo', inputVeiculo);
  formData.append('data_hora_entrada', inputDataHoraEntrada);
  formData.append('data_hora_saida', inputDataHoraSaida);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/estacionamento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postComentario = async (inputPlaca, inputVeiculo, inputDataHoraEntrada, inputDataHoraSaida, inputPrice) => {
  const formData = new FormData();
  formData.append('placa', inputPlaca);
  formData.append('veiculo', inputVeiculo);
  formData.append('data_hora_entrada', inputDataHoraEntrada);
  formData.append('data_hora_saida', inputDataHoraSaida);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/estacionamento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createElement("button");
  span.className = "close";
  txt.innerText = "Excluir"
  txt.className = "delete-btn"
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão detalhes para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButtonDetalhes = (parent) => {
  let span = document.createElement("span");
  let txt = document.createElement("button");
  span.className = "detalhes";
  txt.innerText = "Visualizar"
  txt.className = "detalhes-btn"
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir o comentário e demais detalhes
  --------------------------------------------------------------------------------------
*/
const showElement = () => {
  let detalhes = document.getElementsByClassName("detalhes");
  let i;
  for (i = 0; i < detalhes.length; i++) {
    detalhes[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      exibeItem(nomeItem)
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir um item da lista do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const exibeItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/estacionamento?id=' + item;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {      
      var comentario = "";
      try 
      {
        comentario = "Placa: <b>" + data.placa + "</b></br></br> Veículo: <b>" + data.veiculo + "</b></br></br> Comentários: </br><b>" + data.comentarios[0].texto +"</b>";
      }
      catch(e)
      {
        comentario = "Placa: <b>" + data.placa + "</b></br></br> Veículo: <b>" + data.veiculo + "</b></br></br> Comentários: </br><b>Nenhum comentário cadastrado.</b>"
      }     
      showDetails(comentario)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/estacionamento?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com placa, veiculo, data hora entrada, data hora saída e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let id = null;
  let inputPlaca = document.getElementById("newPlaca").value;
  let inputVeiculo = document.getElementById("newVeiculo").value;
  let inputDataHoraEntrada = document.getElementById("newDataHoraEntrada").value;
  let inputDataHoraSaida = document.getElementById("newDataHoraSaida").value;
  let inputPrice = document.getElementById("newPrice").value;

  if (inputPlaca === '') {
    alert("Escreva a placa de um veículo!");
  } else if (isNaN(inputPrice)) {
    alert("Valor precisa ser número!");
  } else {
    postItem(inputPlaca, inputVeiculo, inputDataHoraEntrada, inputDataHoraSaida, inputPrice)
    limparGrid(id, inputPlaca, inputVeiculo, inputDataHoraEntrada, inputDataHoraSaida, inputPrice)
    
    alert("Registro adicionado!")
    getList()
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, placa, veiculo, data_hora_entrada,data_hora_saida, price) => {
  var item = [id, placa, veiculo, data_hora_entrada,data_hora_saida, price]
  var table = document.getElementById('myTable');
  var row = table.insertRow();  
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonDetalhes(row.insertCell(-1))
  insertButton(row.insertCell(-1))
  document.getElementById("newPlaca").value = "";
  document.getElementById("newVeiculo").value = "";
  document.getElementById("newDataHoraEntrada").value = "";
  document.getElementById("newDataHoraSaida").value = "";
  document.getElementById("newPrice").value = "";

  removeElement()
  showElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const limparGrid = (id, placa, veiculo, data_hora_entrada,data_hora_saida, price) => {
  var item = [id, placa, veiculo, data_hora_entrada,data_hora_saida, price]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.remove(i);
    cel.textContent = item[i];
  }
   
}

/*
  --------------------------------------------------------------------------------------
  Função para converter a data do formato YYYY-MM-DDTHH:Mi para DD/MM/YYYY HH:Mi 
  Ex:  2023-03-29T11:21  --->   29/03/2023 11:21
  --------------------------------------------------------------------------------------
*/
function formatarDataHora(dataHoraStr) {
  let dataHora = new Date(dataHoraStr);
  let dia = dataHora.getDate().toString().padStart(2, '0');
  let mes = (dataHora.getMonth() + 1).toString().padStart(2, '0');
  let ano = dataHora.getFullYear().toString();
  let hora = dataHora.getHours().toString().padStart(2, '0');
  let minutos = dataHora.getMinutes().toString().padStart(2, '0');
  let dataHoraFormatada = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minutos;
  return dataHoraFormatada;
}

/*
  --------------------------------------------------------------------------------------
  Função para formatar um valor para ser exibido como moeda brasileira (R$ 0,00)
  --------------------------------------------------------------------------------------
*/
function formatMoney(value) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
  return formatter.format(value);
}


/*
  --------------------------------------------------------------------------------------
  Funções para manipular o modal de comentários
  --------------------------------------------------------------------------------------
*/
// Get the modal element
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("fechar")[0];

// When the user clicks the "Detalhes" button, open the modal 
function showDetails(text) {
  document.getElementById("modalText").innerHTML = text;
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}