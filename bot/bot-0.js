function init_vars() {
	//vars.min_rsi = 30;
	//vars.max_rsi = 80;
	min_RSI = 30;
	max_RSI = 80;
	pnl_OK = 0.12;
}

async function bot() {
	//$response["tmp"] = "";
	let response = [];
	let array_data;

	//response["positions"] = await getPositions();
	response["open-positions"] = await getOpenPositions();
	//response["orders"] = await getOrders();
	response["open-orders"] = await getOpenOrders();

	if (response["open-positions"]) {
		console.log("entra 0")

		if (!response["open-orders"]) {
			console.log(" - entra1");
			let stop_price = null, limit_price = null;
			//$order_type = floatval($response["open-positions"][0]["openingQty"]);
			let order_type = response["open-positions"][0]["currentQty"];
			let entry_price = response["open-positions"][0]["avgEntryPrice"];
			let qty = response["open-positions"][0]["currentQty"];
			console.log("entry_price = " + entry_price);
			console.log("qty = " + qty);
			// Short position / SELL
			//if ($response["open-positions"]["execSellQty"]) {
			if (order_type < 0) {
				console.log(" - entra2");
				// STOP-limit
				stop_price =  parseInt(entry_price * 1.0033);
				limit_price = stop_price + 50;
				createStopLimitOrder("Buy", (qty * -1), stop_price, limit_price);
				//createStopMarketOrder(qty*-1, stop_price);
				console.log("stop_price = " + stop_price);
				console.log("limit_price = " + limit_price);

				// TAKE-profit ..
				stop_price =  parseInt(entry_price / 1.0065);
				limit_price = parseInt(stop_price + 20);
				createTakeProfitOrder("Buy", (qty * -1), stop_price, limit_price);
				console.log("stop_price = " + stop_price);
				console.log("limit_price = " + limit_price);
				console.log("qty = " + qty*-1);
			} else {
				console.log(" - entra3");
				// Long position / BUY
				//if ($response["open-positions"]["execBuyQty"]) {
					if (order_type > 0) {
					console.log(" - entra4");
					// STOP-limit ..
					stop_price = parseInt(entry_price / 1.0033);
					limit_price = parseInt(stop_price + 50);
					createStopLimitOrder("Sell", (qty * -1), stop_price, limit_price);
					//createStopMarketOrder(qty*-1, stop_price);
					console.log("stop_price = " + stop_price);
					console.log("limit_price = " + limit_price);

					// TAKE-profit ..
					stop_price = parseInt(entry_price * 1.0065);
					limit_price = parseInt(stop_price - 20);
					createTakeProfitOrder("Sell", (qty * -1), stop_price, limit_price);
					//$bitmex->createStopMarketOrder($qty, $stop_price);
					console.log("stop_price = " + stop_price);
					console.log("limit_price = " + limit_price);
				}
			}
		} else {
			console.log(" - entra5");
			array_data = await getWallet();
         	marginNow = parseFloat(array_data[0]['marginBalance'] / 100000000);
          	marginProfitNow = marginNow - lastMargin;
          	if (marginProfitNow < 0) line_color = "red";
          	else line_color = "green";
          	marginProfitNow = marginProfitNow.toFixed(8);
          	profitChart += parseFloat(marginProfitNow);
          	document.getElementById("margin-balance").innerHTML = marginNow;
          	updateChart();
          	order_count++;
          	lastMargin = marginNow;
			/*if (count($response["open-orders"]) < 2) {
				//close any open position
				//echo "Cierra cualquier posición";
	    		$bitmex->closePosition(null);
			}*/
			//close position if ROE is over N%
			if (response["open-positions"]) {
				let pnl = response["open-positions"][0]["unrealisedRoePcnt"];
				console.log ("pnl (unrealisedRoePcnt): " + pnl)

				//	if ROE is 12% or higher close position
				if(pnl > pnl_OK){
					console.log(" - entra6");
					console.log("pnl = " + pnl);
					closePosition(null);
				}
			}
		}
	} else {
		console.log(" - entra7");
		if (Object.keys(response["open-orders"]).length > 0) {
			console.log(" - entra8");
			//close any open orders
			//echo "Cierra cualquier orden abierta.";
	    	//$bitmex->cancelAllOpenOrders("cerrado desde el bot.");
	    	cancelAllOpenOrders();
	    	if (order_active) {
	    		order_active = false;
	    		array_data = await getWallet();
      			balanceNow = parseFloat(array_data[0]['walletBalance'] / 100000000);
      			profitNow = balanceNow - lastBalance
      			if (profitNow < 0) line_color = "red";
      			else line_color = "green";
      			profitNow = profitNow.toFixed(8);
	    		profitChart += parseFloat(profitNow);
	    		document.getElementById("wallet-balance").innerHTML = balanceNow;
	    		updateChart();
	    	}
		} else {
			console.log(" - entra9");
			//$price = $bitmex->getTicker();
			//$last = $price["last"];
			let rsi = await getRSI("5m", 21);
			//$rsi = getRSI_v2($last, "5m", 21, -300, false);
			//$rsi = $rsi["trader_rsi"]["average"];
			console.log("rsi = " + rsi);
			//$rsi = getRSI_v2($last, "5m", 21, -300, $verbose);
			if (rsi < min_RSI) {
				console.log(" - entra10");
				createOrder("Market", "Buy", null, 1000);
				order_active = true;
			} else {
				if (rsi > max_RSI) {
					console.log(" - entra11");
					createOrder("Market", "Sell", null, 1000);
					order_active = true;
				}
			}
			if (order_active) {
				order_count++;
				if (order_count == 1) drawChart();
				lastBalance = parseFloat(document.getElementById("wallet-balance").innerHTML)
			}
		}
	}
}