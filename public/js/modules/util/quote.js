function quote() {
  let mainMensage = document.querySelector("h3"),
    price = document.querySelector("#price"),
    price_open = document.querySelector("#open"),
    day_high = document.querySelector("#high"),
    day_low = document.querySelector("#low");

  mainMensage.innerText = "buscando...";
  price.innerHTML = "";
  price_open.innerHTML = "";
  day_high.innerHTML = "";
  day_low.innerHTML = "";

  const stockCode = document.querySelector("input").value;

  if (!stockCode) {
    mainMensage.innerText = "O ativo deve ser informado";
    return;
  }

  fetch(`/quotes?stockCode=${stockCode}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        mainMensage.innerText = `Consulta indisponível`;
        price.innerHTML = `${data.error.mensage} | código ${data.error.code}`;
      } else {
        mainMensage.innerText = data.symbol;
        price.innerHTML = `PRICE: ${data.close}`;
        price_open.innerHTML = `OPEN: ${data.open}`;
        day_high.innerHTML = `HIGH: ${data.high}`;
        day_low.innerHTML = `LOW: ${data.low}`;
      }
    });
  });
}

export default quote;