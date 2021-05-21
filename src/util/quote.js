/* Detalhes da API em https://marketstack.com/documentation
    OBS: todos os ativos da B3 estão com '.BVMF' no final
    A API possui suporte para 72 bolsas de valores.
    Para diversificar a consulta entre os balcões, o frontend deverá implementar a seleção de
    stock exchange
*/

const request = require("request");

// Checking application environment (dev/prod)
const api_token =
  process.env.STOCK_KEY ||
  require("dotenv").config({ path: __dirname + "/.env" }).parsed["STOCK_KEY"];

const quote = (symbol, callback) => {
  const url = `http://api.marketstack.com/v1/eod/latest?symbols=${
    symbol + ".BVMF"
  }&access_key=${api_token}`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback(
        {
          mensage: `Something went wrong: ${err}`,
          code: 500,
        },
        undefined
      );
      return;
    }

    if (!response.body || !response.body.data) {
      callback(
        {
          mensage: `No data found`,
          code: 404,
        },
        undefined
      );
      return;
    }

    const { open, high, low, close, symbol } = response.body.data[0];

    callback(undefined, { open, high, low, close, symbol });
  });
};

module.exports = quote;