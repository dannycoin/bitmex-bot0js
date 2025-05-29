# Simple Cryptocurrency Trading Bot Interface

This project provides a web-based interface for developing, testing, and running a cryptocurrency trading bot. It utilizes the CCXT library for exchange communication (with a specific focus on BitMEX in the provided examples) and features an RSI-based trading strategy as a starting point.

The interface allows users to load their own bot logic, monitor its performance through a chart, and manage its operation.

## Features

*   **Web-Based Interface:** Control and monitor your trading bot from your browser.
*   **Live Code Editor:** Utilizes CodeMirror to allow for in-browser editing and loading of the bot's JavaScript logic.
*   **Real-time Data Display:** View current account information (username, wallet balance, margin balance), last traded price, and RSI values.
*   **Order and Position Monitoring:** Keep track of your open orders and current positions on the exchange.
*   **Profit Charting:** Visualize your bot's performance over time with a dynamic chart powered by CanvasJS.
*   **Customizable UI Themes:** Choose between different themes for the web interface and the code editor.
*   **Exchange Integration:** Built with CCXT, with specific helper functions for the BitMEX API in `lib/bitmex-api.js`.
*   **Sample Bot Logic:** Includes a sample RSI-based trading strategy in `bot/bot-0.js`.

## Project Structure

*   `README.md`: This file, providing an overview of the project.
*   `bot0-test0.html`: The main HTML file that serves as the web interface for the trading bot.
*   `bot/`: This directory contains example bot implementations.
    *   `bot-0.js`: A sample bot implementing an RSI-based trading strategy. This code is intended to be copied into the editor in the web interface.
*   `lib/`: Contains core JavaScript libraries and helper scripts:
    *   `ccxt.browser.js`: The CCXT library for interacting with various cryptocurrency exchanges.
    *   `bitmex-api.js`: Helper functions specifically for interacting with the BitMEX API (e.g., fetching positions, creating orders). Contains API key placeholders.
    *   `indicators.js`: Functions for calculating trading indicators like RSI.
    *   `controls.js`: Handles UI interactions, starting/stopping the bot, and updating data displays on the webpage.
    *   `cm/`: CodeMirror library files for the in-browser code editor.
    *   `fengari-web.js`: Lua interpreter (though its usage isn't immediately obvious from the primary bot functionality).
*   `css/`: Contains stylesheets for the web interface and CodeMirror editor themes.
    *   `bot.css`: Main styles for `bot0-test0.html`.
    *   `cm/`: CodeMirror-specific CSS files.

## Setup and Usage

1.  **Get the Code:**
    *   Clone this repository to your local machine or download the source code.

2.  **API Key Configuration:**
    *   Before you can trade, you **MUST** configure your BitMEX API keys.
    *   Open the `lib/bitmex-api.js` file.
    *   Locate the following lines:
        ```javascript
        const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key
        const apiSecret = "YOUR_API_SECRET_HERE"; // Replace with your actual API secret
        ```
    *   Replace `"YOUR_API_KEY_HERE"` and `"YOUR_API_SECRET_HERE"` with your actual BitMEX API key and secret.
    *   **Note on Testnet vs. Mainnet:** By default, the `API_URL` in `lib/bitmex-api.js` is set to the BitMEX testnet: `https://testnet.bitmex.com`. If you want to trade on the live BitMEX exchange (mainnet), you will need to change this to `https://www.bitmex.com`. Be extremely careful when trading on the mainnet with real funds.
    *   **Proxy Configuration:** The `lib/bitmex-api.js` file also includes settings for a proxy (`PROXY_URL` and the `proxy` boolean variable). If you need to use a proxy, configure these settings accordingly.

3.  **Run the Interface:**
    *   Open the `bot0-test0.html` file in a modern web browser (e.g., Chrome, Firefox).

4.  **Load Bot Code:**
    *   The web interface includes a code editor. You need to load the trading bot's JavaScript logic into this editor.
    *   A sample RSI-based bot is provided in `bot/bot-0.js`. Open this file, copy its entire contents.
    *   Paste the copied code into the text editor area within the `bot0-test0.html` interface.
    *   The key functions expected by the interface are `init_vars()` (for setting up initial variables) and `async function bot()` (which contains the main trading loop).

5.  **Start the Bot:**
    *   Once your API keys are configured and the bot code is loaded into the editor, click the "Iniciar Bot" (Start Bot) button in the interface.
    *   The bot status should change, and it will begin executing its trading logic based on the defined strategy (e.g., buying/selling based on RSI).

6.  **Monitor and Control:**
    *   Use the interface to monitor your account balance, wallet funds, current price, RSI, open positions, and open orders.
    *   The chart will display the profit/loss progression.
    *   To stop the bot, click the "Parar Bot" (Stop Bot) button.

## Key Technologies Used

*   **HTML, CSS, JavaScript:** The core web technologies used for the interface and bot logic.
*   **CCXT (CryptoCurrency eXchange Trading Library):** Used for general interaction with cryptocurrency exchanges. The `lib/ccxt.browser.js` file is included.
*   **BitMEX API Specific Helpers:** Custom functions in `lib/bitmex-api.js` tailor operations for the BitMEX exchange.
*   **CodeMirror:** A versatile text editor implemented in JavaScript for browsers, used here for the bot code editor.
*   **CanvasJS:** A JavaScript charting library used to display the profit/loss graph.
*   **(Fengari):** A Lua interpreter for the browser is included (`lib/fengari-web.js`), though its direct application in the primary bot functionality isn't immediately apparent from the main use case.

## Customizing Bot Logic

The trading bot's strategy is defined by the JavaScript code loaded into the editor in the web interface. The provided sample in `bot/bot-0.js` uses an RSI-based approach:

*   It initializes variables like RSI thresholds (`min_RSI`, `max_RSI`) and profit targets (`pnl_OK`) in an `init_vars()` function.
*   The main logic resides in an `async function bot()` which is executed repeatedly. This function typically:
    *   Checks for open positions and orders.
    *   Manages stop-loss and take-profit orders.
    *   If no open positions, it fetches RSI data.
    *   Makes decisions to buy or sell based on RSI crossing the defined thresholds.

To implement your own trading strategy:

1.  **Modify `init_vars()`:** Adjust or add any variables your strategy requires.
2.  **Rewrite `async function bot()`:** Implement your custom logic for:
    *   Fetching necessary data (e.g., different indicators, order book depth).
    *   Making trading decisions (entry and exit conditions).
    *   Managing orders (placing, cancelling, stop-loss, take-profit).
3.  Ensure your custom code is pasted into the editor on the `bot0-test0.html` page before starting the bot. You can use the existing functions in `lib/bitmex-api.js` and `lib/indicators.js` or add your own.

## Disclaimer

*   **Use at Your Own Risk:** Trading cryptocurrencies involves significant risk of financial loss. This software is provided "as is" without any warranty of functionality or fitness for a particular purpose.
*   **Test Thoroughly:** Before trading with real funds, thoroughly test your bot logic and configuration on the BitMEX testnet or using simulation.
*   **Not Financial Advice:** This project and its code are for educational and experimental purposes only. It does not constitute financial advice.
*   **Security:** Be extremely careful with your API keys. Ensure they are stored securely and that the machine running this interface is secure. The example API keys in `lib/bitmex-api.js` are placeholders and should be replaced immediately with your own.
