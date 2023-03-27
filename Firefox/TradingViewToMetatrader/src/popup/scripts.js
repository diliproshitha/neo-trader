function sendOrder() {
  const order = getOrder();
  const url = `http://localhost:23456/submit-trade?symbol=${order.instrument}&type=${order.type}&entryPrice=${order.entryPrice}
  &stopLossPrice=${order.stopLossPrice}&takeProfitPrice=${order.takeProfitPrice}&riskPercentage=${order.riskPercentage}`;

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

function getOrder() {
  const order = {};
  order.instrument = document.getElementById('input-pair').value;
  order.type = document.getElementById('input-position-type').value;
  order.entryPrice = document.getElementById('input-position-entry-price').value;
  order.stopLossPrice = document.getElementById('input-position-sl-price').value;
  order.takeProfitPrice = document.getElementById('input-position-tp-price').value;
  order.riskPercentage = document.getElementById('input-position-lot-size').value;
  return order;
}

const showErrorContent = () => {
  document.getElementById('popup-content').classList.add('hidden');
  document.getElementById('error-content').classList.remove('hidden');
}

const setTradeInfo = (position) => {
  if (position) {
    console.log(position);
    document.getElementById('input-pair').value = position.instrument;
    document.getElementById('input-position-type').value = position.type;
    document.getElementById('input-position-entry-price').value = position.entryPrice;
    document.getElementById('input-position-sl-price').value = position.stopLossPrice;
    document.getElementById('input-position-tp-price').value = position.takeProfitPrice;
    document.getElementById('input-position-lot-size').value = "1.0";
    document.getElementById('send-button').addEventListener('click', () => sendOrder());
  } else {
    showErrorContent();
  }
}

window.addEventListener('focus', () => {
  browser.tabs.executeScript({ file: "../content_scripts/fetchTradeInfo.js" })
    .then(result => {
      console.log(result);
      if (result && result[0]) {
        setTradeInfo(result[0])
      } else {
        showErrorContent();
      }
    })
    .catch(err => console.error(err));
});
