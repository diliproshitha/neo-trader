const setTradeInfo = (result) => {
  if (result && result[0]) {
    document.getElementById('instrument').innerHTML = result[0].instrument;
    document.getElementById('type').innerHTML = result[0].type;
    document.getElementById('entry-price').innerHTML = result[0].entryPrice;
    document.getElementById('stop-loss-price').innerHTML = result[0].stopLossPrice;
    document.getElementById('take-profit-price').innerHTML = result[0].takeProfitPrice;

    document.getElementById('send-button').addEventListener('click', () => sendOrder(result[0]));
  } else {
    document.getElementById('popup-content').classList.add('hidden');
    document.getElementById('error-content').classList.remove('hidden');
  }
}

browser.tabs.executeScript({ file: "../content_scripts/fetchTradeInfo.js" })
  .then(setTradeInfo)
  .catch(err => console.error(err));
  
function sendOrder(order) {
  document.getElementById('instrument').innerHTML = JSON.stringify(order);
  let url = `http://localhost:23456/submit-trade?symbol=${order.instrument}&type=${order.type}&entryPrice=${order.entryPrice}&stopLossPrice=${order.stopLossPrice}&takeProfitPrice=${order.takeProfitPrice}`;
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  })
     .then(response => document.getElementById('instrument').innerHTML = JSON.stringify(response.json()))
     .then(response => console.log(JSON.stringify(response)));
}
