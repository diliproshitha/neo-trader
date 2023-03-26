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

const showErrorContent = () => {
  document.getElementById('popup-content').classList.add('hidden');
    document.getElementById('error-content').classList.remove('hidden');
}

const setTradeInfo = (position) => {
  if (position) {
    document.getElementById('instrument').innerHTML = position.instrument;
    document.getElementById('type').innerHTML = position.type;
    document.getElementById('entry-price').innerHTML = position.entryPrice;
    document.getElementById('stop-loss-price').innerHTML = position.stopLossPrice;
    document.getElementById('take-profit-price').innerHTML = position.takeProfitPrice;

    document.getElementById('send-button').addEventListener('click', () => sendOrder(position));
  } else {
    showErrorContent();
  }
}

window.addEventListener('focus', () => {
  browser.tabs.executeScript({ file: "../content_scripts/fetchTradeInfo.js" })
    .then(result => {
      if (result && result[0]) {
        setTradeInfo(result[0])
      } else {
        showErrorContent();
      }
    })
    .catch(err => console.error(err));
});
