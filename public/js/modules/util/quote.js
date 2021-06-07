const mainMensage = document.querySelector("h3");
const price = document.querySelector("#price");
const price_open = document.querySelector("#open");
const day_high = document.querySelector("#high");
const day_low = document.querySelector("#low");

const quote = () => {
    mainMensage.innerText = "buscando...";
    
    const stockCode = document.querySelector("input").value;
    
    if (!stockCode) {
      mainMensage.innerText = "O ativo deve ser informado";
      price.innerHTML = "";
      price_open.innerHTML = "";
      day_high.innerHTML = "";
      day_low.innerHTML = "";
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