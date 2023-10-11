//+------------------------------------------------------------------+
//|                                                    NeoTrader.mq5 |
//|                                  Copyright 2023, MetaQuotes Ltd. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2023, Dilip Roshitha"
#property link      "https://github.com/diliproshitha/"
#property version   "1.00"

/* ###################################################################

Example socket server.
Code can be used as both MQ4 and MQ5 (on both 32-bit and 64-bit MT5)

Receives messages from the example client and simply writes them
to the Experts log.

Also contains functionality for handling files sent by the example 
file-sender script.

In addition, you can telnet into the server's port. Any CRLF-terminated
message you type is similarly printed to the Experts log. You
can also type in the commands "quote", to which the server reponds
with the current price of its chart, or "close", which causes the
server to shut down the connection.

As well as demonstrating server functionality, the use of Receive()
and the event-driven handling are also applicable to a client
which needs to receive data from the server as well as just sending it.

################################################################### */


#property strict

// --------------------------------------------------------------------
// Include socket library, asking for event handling
// --------------------------------------------------------------------

#define SOCKET_LIBRARY_USE_EVENTS
#include <socket-library-mt4-mt5.mqh>

// --------------------------------------------------------------------
// EA user inputs
// --------------------------------------------------------------------

input ushort   ServerPort = 23456;  // Server port
input double DefaultRiskPercentage = 1;
input int MaximumSlippage = 3;
input int MagicNumber = 98765;
input color ArrowColor = clrRed;
input string SymbolPostfix = "";
input bool CalculateLotSizeToFixedValue = false;
input double AccountBalanceToCalculateLotSize = 10000;


// --------------------------------------------------------------------
// Global variables and constants
// --------------------------------------------------------------------

// Frequency for EventSetMillisecondTimer(). Doesn't need to 
// be very frequent, because it is just a back-up for the 
// event-driven handling in OnChartEvent()
#define TIMER_FREQUENCY_MS    1000

// Server socket
ServerSocket * glbServerSocket = NULL;

// Array of current clients
ClientSocket * glbClients[];

// Watch for need to create timer;
bool glbCreatedTimer = false;


// --------------------------------------------------------------------
// Initialisation - set up server socket
// --------------------------------------------------------------------

void OnInit()
{
   // If the EA is being reloaded, e.g. because of change of timeframe,
   // then we may already have done all the setup. See the 
   // termination code in OnDeinit.
   if (glbServerSocket) {
      Print("Reloading EA with existing server socket");
   } else {
      // Create the server socket
      glbServerSocket = new ServerSocket(ServerPort, false);
      if (glbServerSocket.Created()) {
         Print("Server socket created");
   
         // Note: this can fail if MT4/5 starts up
         // with the EA already attached to a chart. Therefore,
         // we repeat in OnTick()
         glbCreatedTimer = EventSetMillisecondTimer(TIMER_FREQUENCY_MS);
      } else {
         Print("Server socket FAILED - is the port already in use?");
      }
   }
}


// --------------------------------------------------------------------
// Termination - free server socket and any clients
// --------------------------------------------------------------------

void OnDeinit(const int reason)
{
   switch (reason) {
      case REASON_CHARTCHANGE:
         // Keep the server socket and all its clients if 
         // the EA is going to be reloaded because of a 
         // change to chart symbol or timeframe 
         break;
         
      default:
         // For any other unload of the EA, delete the 
         // server socket and all the clients 
         glbCreatedTimer = false;
         
         // Delete all clients currently connected
         for (int i = 0; i < ArraySize(glbClients); i++) {
            delete glbClients[i];
         }
         ArrayResize(glbClients, 0);
      
         // Free the server socket. *VERY* important, or else
         // the port number remains in use and un-reusable until
         // MT4/5 is shut down
         delete glbServerSocket;
         glbServerSocket = NULL;
         Print("Server socket terminated");
         break;
   }
}


// --------------------------------------------------------------------
// Timer - accept new connections, and handle incoming data from clients.
// Secondary to the event-driven handling via OnChartEvent(). Most
// socket events should be picked up faster through OnChartEvent()
// rather than being first detected in OnTimer()
// --------------------------------------------------------------------

void OnTimer()
{
   // Accept any new pending connections
   AcceptNewConnections();
   
   // Process any incoming data on each client socket,
   // bearing in mind that HandleSocketIncomingData()
   // can delete sockets and reduce the size of the array
   // if a socket has been closed

   for (int i = ArraySize(glbClients) - 1; i >= 0; i--) {
      HandleSocketIncomingData(i);
   }
}


// --------------------------------------------------------------------
// Accepts new connections on the server socket, creating new
// entries in the glbClients[] array
// --------------------------------------------------------------------

void AcceptNewConnections()
{
   // Keep accepting any pending connections until Accept() returns NULL
   ClientSocket * pNewClient = NULL;
   do {
      pNewClient = glbServerSocket.Accept();
      if (pNewClient != NULL) {
         int sz = ArraySize(glbClients);
         ArrayResize(glbClients, sz + 1);
         glbClients[sz] = pNewClient;
         Print("New client connection");
         
         // pNewClient.Send("Hello\r\n");
      }
      
   } while (pNewClient != NULL);
}


// --------------------------------------------------------------------
// Handles any new incoming data on a client socket, identified
// by its index within the glbClients[] array. This function
// deletes the ClientSocket object, and restructures the array,
// if the socket has been closed by the client
// --------------------------------------------------------------------

void HandleSocketIncomingData(int idxClient)
{
   ClientSocket * pClient = glbClients[idxClient];

   // Keep reading CRLF-terminated lines of input from the client
   // until we run out of new data
   bool bForceClose = false; // Client has sent a "close" message
   string strCommand;
   do {
      strCommand = pClient.Receive("");
      if (strCommand == "quote") {
         pClient.Send(Symbol() + "," + DoubleToString(SymbolInfoDouble(Symbol(), SYMBOL_BID), 6) + "," + DoubleToString(SymbolInfoDouble(Symbol(), SYMBOL_ASK), 6) + "\r\n");

      } else if (strCommand == "close") {
         bForceClose = true;

      } else if (StringFind(strCommand, "FILE:") == 0) {
         // ** See the example file-send script... **
      
         // Extract the base64 file data - the message minus the FILE: header - and 
         // put it into an array 
         string strFileData = StringSubstr(strCommand, 5);
         uchar arrBase64[];
         StringToCharArray(strFileData, arrBase64, 0, StringLen(strFileData));
         
         // Do base64 decoding on the data, converting it to the zipped data 
         uchar arrZipped[], dummyKey[];
         if (CryptDecode(CRYPT_BASE64, arrBase64, dummyKey, arrZipped)) {
            
            // Unzip the data 
            uchar arrOriginal[];
            if (CryptDecode(CRYPT_ARCH_ZIP, arrZipped, dummyKey, arrOriginal)) {
               // Okay, we should now have the raw file 
               int f = FileOpen("receive.dat", FILE_BIN | FILE_WRITE);
               if (f == INVALID_HANDLE) {
                  Print("Unable to open receive.dat for writing");
               } else {
                  FileWriteArray(f, arrOriginal);
                  FileClose(f);
                  
                  Print("Created receive.dat file");
               }
            } else {
               Print("Unzipping of file data failed");               
            }
         } else {
            Print("Decoding from base64 failed");
         }
         
      } else if (strCommand != "" && StringFind(strCommand, "submit-trade") != -1) {
         // Potentially handle other commands etc here.
         // For example purposes, we'll simply print messages to the Experts log
         Print("<- ", strCommand);
         bool result = ProcessOrder(strCommand);//---
         if (result) {
            Print("Order placed successfully");
            pClient.Send("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\n\nSUCCESS");
         } else {
             string error = GetLastError();
             Print("Error sending sell limit order: ", error);
             pClient.Send("HTTP/1.1 500 INTERNAL_SERVER_ERROR\r\nAccess-Control-Allow-Origin: *\n\nERROR: " + error);
         }
         bForceClose = true;
        
      }
      break;
   } while (strCommand != "");

   // If the socket has been closed, or the client has sent a close message,
   // release the socket and shuffle the glbClients[] array
   if (!pClient.IsSocketConnected() || bForceClose) {
      Print("Client has disconnected");

      // Client is dead. Destroy the object
      delete pClient;
      
      // And remove from the array
      int ctClients = ArraySize(glbClients);
      for (int i = idxClient + 1; i < ctClients; i++) {
         glbClients[i - 1] = glbClients[i];
      }
      ctClients--;
      ArrayResize(glbClients, ctClients);
   }
}

bool ProcessOrder(string urlString) {
   string symbol = "";
   int type = 0;
   double entryPrice = 0.0;
   double stopLossPrice = 0.0;
   double takeProfitPrice = 0.0;
   double riskPercentage = DefaultRiskPercentage / 100;
   
   // Define an array of attribute names
   string attributeNames[5] = {"symbol", "type", "entryPrice", "stopLossPrice", "takeProfitPrice", "riskPercentage"};
   
   // Iterate over the attribute names and extract their values
   for (int i = 0; i < ArraySize(attributeNames); i++) {
       string myAttributeName = attributeNames[i];
       int myNamePosition = StringFind(urlString, myAttributeName + "=");
       if (myNamePosition >= 0) {
           int myValuePosition = myNamePosition + StringLen(myAttributeName) + 1;
           int myValueLength = StringFind(urlString, "&", myValuePosition) - myValuePosition;
           if (myValueLength <= 0) {
               myValueLength = StringLen(urlString) - myValuePosition;
           }
           string myValue = StringSubstr(urlString, myValuePosition, myValueLength);
           if (myAttributeName == "symbol") {
               symbol = myValue + SymbolPostfix;
           } else if (myAttributeName == "type") {
               type = StrToInteger(myValue);
           } else if (myAttributeName == "entryPrice") {
               entryPrice = StrToDouble(myValue);
           } else if (myAttributeName == "stopLossPrice") {
               stopLossPrice = StrToDouble(myValue);
           } else if (myAttributeName == "takeProfitPrice") {
               takeProfitPrice = StrToDouble(myValue);
           } else if (myAttributeName == "riskPercentage") {
               riskPercentage = StrToDouble(myValue) / 100;
           }
       }
   }
   return SubmitTrade(symbol, type, entryPrice, stopLossPrice, takeProfitPrice, riskPercentage);
}

bool SubmitTrade(string symbol, int type, double entryPrice, double stopLossPrice, double takeProfitPrice, double riskPercentage) {
   int stopLossDistance = GetDifferenceInPips(entryPrice, stopLossPrice);
   Print("stopLossDistance: ", stopLossDistance);
   double lotSize = GetLotSize(riskPercentage, stopLossDistance, symbol);
   
   Print("Symbol: ", symbol);
   Print("Type: ", type);
   Print("Entry Price: ", entryPrice);
   Print("Stop Loss Price: ", stopLossPrice);
   Print("Take Profit Price: ", takeProfitPrice);
   Print("Lot Size: ", lotSize);
   
   return OrderSend(symbol, ToOrderType(type, entryPrice, symbol), lotSize, entryPrice, MaximumSlippage, stopLossPrice, takeProfitPrice, "Order submitted by Neo Trader EA", MagicNumber, 0, ArrowColor);
}

int ToOrderType(int type, double orderPrice, string symbol) {
   if (type == 110) {
      return OP_BUY;
   } else if (type == 121) {
      return DeterminePendingOrderType(MarketInfo(symbol, MODE_BID), orderPrice, OP_BUY);
   } else if (type == 122) {
      return OP_BUYLIMIT;
   } else if (type == 123) {
      return OP_BUYSTOP;
   } else if (type == 210) {
      return OP_SELL;
   } else if (type == 221) {
      return DeterminePendingOrderType(MarketInfo(symbol, MODE_ASK), orderPrice, OP_SELL);
   } else if (type == 222) {
      return OP_SELLLIMIT;
   } else if (type == 223) {
      return OP_SELLSTOP;
   } else {
      return -1; // invalid
   }
}

// Determine the pending order type based on current price and order price
int DeterminePendingOrderType(double currentPrice, double orderPrice, int orderType) {
    if (orderType == OP_BUY) {
        if (currentPrice > orderPrice) {
            return OP_BUYSTOP;  // Buy Stop order
        } else {
            return OP_BUYLIMIT;  // Buy Limit order
        }
    } else if (orderType == OP_SELL) {
        if (currentPrice > orderPrice) {
            return OP_SELLSTOP;  // Sell Stop order
        } else {
            return OP_SELLLIMIT;  // Sell Limit order
        }
    } else {
        return -1;  // Invalid order type
    }
}

double GetLotSize(double riskPercentage, int stopLossPips, string symbol) {
   double tickValue = MarketInfo(Symbol(), MODE_TICKVALUE);
   return (accountBalance * riskPercentage) / (stopLossPips * tickValue);
}

double GetAccountBalanceForLotSizeCalc() {
   if (CalculateLotSizeToFixedValue) {
      return AccountBalanceToCalculateLotSize;
   }
   return AccountBalance();
}

int GetDifferenceInPips(double firstValue, double secondValue) {
   double factor = GetFactor();
   Print("Factor", factor);
   return MathAbs(firstValue - secondValue) * factor;
   
}

double GetFactor() {
   return MathPow(10, Digits);
}


// --------------------------------------------------------------------
// Use OnTick() to watch for failure to create the timer in OnInit()
// --------------------------------------------------------------------

void OnTick()
{
   if (!glbCreatedTimer) glbCreatedTimer = EventSetMillisecondTimer(TIMER_FREQUENCY_MS);
}

// --------------------------------------------------------------------
// Event-driven functionality, turned on by #defining SOCKET_LIBRARY_USE_EVENTS
// before including the socket library. This generates dummy key-down
// messages when socket activity occurs, with lparam being the 
// .GetSocketHandle()
// --------------------------------------------------------------------

void OnChartEvent(const int id, const long& lparam, const double& dparam, const string& sparam)
{
   if (id == CHARTEVENT_KEYDOWN) {
      // If the lparam matches a .GetSocketHandle(), then it's a dummy
      // key press indicating that there's socket activity. Otherwise,
      // it's a real key press
         
      if (lparam == glbServerSocket.GetSocketHandle()) {
         // Activity on server socket. Accept new connections
         Print("New server socket event - incoming connection");
         AcceptNewConnections();

      } else {
         // Compare lparam to each client socket handle
         for (int i = 0; i < ArraySize(glbClients); i++) {
            if (lparam == glbClients[i].GetSocketHandle()) {
               HandleSocketIncomingData(i);
               return; // Early exit
            }
         }
         
         // If we get here, then the key press does not seem
         // to match any socket, and appears to be a real
         // key press event...
      }
   }
}
