# Remote server guide

If you are running your Trading terminal in a remote server, then you need to expose the port that is given for EA to public internet.
To do this we can use NGrok reverse proxy.

### Ngrok setup
1. Visit [ngrok website](https://dashboard.ngrok.com/get-started/setup) and create a free account.
2. Download the ngrok agent and unzip files.
3. Open a new terminal in unzipped folder.
4. Execute command: `ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE`. Replace YOUR_AUTH_TOKEN_HERE with your own auth token. This is shown in ngrok account dashboard.
5. Then you can expose the trading terminal port by executing the command: `ngrok http YOUR_PORT_HERE`. Replace YOUR_PORT_HERE with EA port.
6. Then ngrok will give you an https address. You can use this address in browser extension.