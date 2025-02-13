# Neo Trader
### Send orders from Traingview to Metatrader platform with one click!

## How it works?
1. Install Expert Advisor in Metatrader terminal.
    - Go to MT4 (for metatrader 4) or MT5 (for metatrader 5) directory and copy the contents of Include and Experts directories into your Metatrader 
  data folder's Include and Experts directories respectively. 
    - Open Metatrader terminal and make sure you have enabled automated trading.
    - You will see `NeoTrader` expert advisor in Metatrader experts section. Add 
  it to a chart and go to Inputs tab. Set following configurations according to your requirements.

      ![Screenshot of Expert advisor configurations](mt4-expert.png "EA Configurations")

      - ServerPort - port of the server to be run.
      - DefaultRiskPercentage - Risk percentage per trade. This can be overridden using browser plugin.
      - MaximumSplippage - Maximum allowed splippage when executing the trade. This is not applicable to limit trades, 
      so we do not need to worry about this.
      - MagicNumber - A number to identify trades placed by this EA. No need to change.
      - ArrowColor - Forget it!
      - SymbolPostfix - Some brokers add some letters into the end of the symbol name. As you can see
      in above screenshot, symbol name is `EURUSD.a`. So `.a` should be added as SymbolPostfix.  
      - CalculateLotSizeToFixedValue - When set to `true`, expert advisor will calculate lot size to given account balance given under `AccountBalanceToCalculateLotSize`.
      - AccountBalanceToCalculateLotSize - If CalculateLotSizeToFixedValue is set to `true`, this value will be used to calculate lot size as account balance.
2. Install Browser extension.
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/neo-trader/
   - Chrome - https://chrome.google.com/webstore/detail/neo-trader/cjdgehgngjapndihjoddmpiafiagbcpb?utm_source=ext_app_menu
3. Configure server Addresses. You can add addresses by clicking on settings icon in the extension.
    - If you run your terminals locally, then you can use address: `http://localhost:EA_SERVER_PORT`.
    - If you are running terminals in a remote VPS, then you need to expose configured EA server port using ngrok. You can use [this guide](REMOTE_SERVER_GUIDE.md) to configure ngrok.
4. Send positions from Tradingview to Metatrader.

    ![tradingview-extension.png](tradingview-extension.png)

   - Open a chart in trading view and draw a position using position tool and double-click on it.
   Position details popup will appear. 
   - Open the extension, and it will show the position details. 
   - Select desired order execution type. (Market order or Pending order)
   - If execution type is pending, then select pending order type. If set to `Auto`, EA will determine whether to place to a Limit order or a Stop order according to current price.
   - Then click on `Send` button. Trade will be placed in the Metatrader platform.

#### If you have any issues regarding EA or browser plugin, please raise a Github issue.

## Legal Notice
This software is provided "as is" without warranty of any kind. The authors and contributors are not responsible for any losses, damages, or other liabilities arising from the use of this software. Users are solely responsible for compliance with applicable securities regulations and broker requirements.

## Credits:
I have used following socket library to build the EA.
- https://www.mql5.com/en/blogs/post/706665
