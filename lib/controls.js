var timeOut;
var running = false, stopped = true;
var loaded_vars = false;
var vars = {}
var order_active = false, order_count = 0;
var balanceNow = 0, lastBalance = 0, profitChart = 0, profitNow = 0;
var marginNow = 0, marginProfitNow = 0, lastMargin = 0;

//-----------------------------
// GLOBAL AJAX async function
//-----------------------------
async function _ajax_send(URL) {

	let res = await fetch(URL)
		.then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))

	//let data = res.json();
	//console.log(data);
	return res.json();
}
//-----------------------------
// var_dump / print_r LIKE php
//-----------------------------
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { //Array/Hashes/Objects
		for(var item in arr) {
			var value = arr[item];

			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "[" + item + "] ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "[" + item + "] => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
//----------------------------------------------------
// update Account info (like username, wallet, etc..)
//----------------------------------------------------
async function updateAccount() {
	try {
		//let array_data = await _ajax_send("bot0.php?user-info=1&ticker=1");
		let array_data = await getUserInfo();
		document.getElementById("username").innerHTML = array_data["username"];

		array_data = await getWallet();
		balanceNow = parseFloat(array_data[0]['walletBalance'] / 100000000);
		lastBalance = balanceNow;
      	document.getElementById("wallet-balance").innerHTML = balanceNow;
      	if (typeof sbalance === 'undefined') sbalance = balanceNow;

      	marginNow = parseFloat(array_data[0]['marginBalance'] / 100000000)
      	lastMargin = marginNow;

      	document.getElementById("margin-balance").innerHTML = lastMargin
      	//console.log (array_data["user-info"]["wallet"]);
      	//console.log (array_data["tmp"]["nonce"]);
      	//console.log (array_data["tmp"]["sign"]);
      	//console.log (array_data);
      	array_data = await getTicker();
      	document.getElementById("last-price").innerHTML = array_data;
    } catch (error) {
    	console.log (error);
    }
}
//----------------------------------------------------
// update last price (ticker)
//----------------------------------------------------
async function updateTicker() {
	try {
		//let array_data = await _ajax_send("bot0.php?ticker=1");
		let array_data = await getTicker();
      	document.getElementById("last-price").innerHTML = array_data;
    } catch (error) {
    	console.log (error);
    }
}
//-----------------------------
// update the RSI indicators
//-----------------------------
async function updateRSI(verbose = false) {
	try {
		//let array_data = await _ajax_send(`bot0.php?rsi=1&verbose=${verbose}`);
		let rsi = await getRSI("5m", 21);
		console.log("--------- RSI -------------");
		console.log(rsi);
		//console.log("--------- RSI-v2 ----------");
		//console.table(array_data["RSI-v2"]);

      	document.getElementById("rsi").innerHTML = rsi;
      	//document.getElementById("rsi-v2").innerHTML = array_data["RSI-v2"]["data"];
      	//document.getElementById("trader-rsi").innerHTML = array_data["RSI"]["trader_rsi"][13];

      	if (verbose) {
	      	//document.getElementById("debug").innerHTML = array_data["RSI-v2"]["debug"];
	      	//array_data = array_data["RSI"]["hist-json"];
	      	//document.getElementById("debug-textarea").innerHTML = dump(array_data["RSI-v2"]["hist"]);
      	}
      	//console.table(array_data["RSI-v2"]["hist"]);
    } catch (error) {
    	console.log (error);
    }

	//<?php //$response = getRSI_v2($last, "5m", 21, -300, verbose); ?>
	//array_data = JSON.parse(<?php //echo "'".$response["hist-json"]."'"; ?>);
	//document.getElementById("debug").innerHTML = <?php //echo '"'.$response["debug"].'"'; ?>;
	//array_data = JSON.stringify(array_data, null, 2);
	//array_data.replaceAll("{", "=")
	//document.getElementById("debug-textarea").innerHTML = dump(array_data);
	//document.getElementById("rsi").innerHTML = <?php //echo '"'."<b>".$response["RSI"]."</b>".'"'; ?>;
}
//----------------------------------------------------
// update positions ...
//----------------------------------------------------
async function updatePositions() {
	try {
		//let array_data = await _ajax_send("bot0.php?positions=1");
		//let array_data = await getPositions();
      	//document.getElementById("positions").innerHTML = dump(array_data);
      	let array_data = await getOpenPositions();
      	document.getElementById("open-positions").innerHTML = dump(array_data);
      	//console.log("openingQty: " + array_data["open-positions"][0]["openingQty"]);
      	//console.log("avgEntryPrice: " + array_data["open-positions"][0]["avgEntryPrice"]);
      	//console.log("currentQty: " + array_data["open-positions"][0]["currentQty"]);
    } catch (error) {
    	console.log (error);
    }
}
//----------------------------------------------------
// update positions ...
//----------------------------------------------------
async function updateOrders() {
	try {
		//let array_data = await _ajax_send("bot0.php?orders=1");
		//let array_data = await getOrders();
      	//document.getElementById("orders").innerHTML = dump(array_data);
      	let array_data = await getOpenOrders();
      	document.getElementById("open-orders").innerHTML = dump(array_data);
      	//console.log(array_data)
    } catch (error) {
    	console.log (error);
    }
}
//----------------------------------------------------
// RUN-bot ...
//----------------------------------------------------
async function startBot() {
	let array_data = await getWallet();
	balanceNow = parseFloat(array_data[0]['walletBalance'] / 100000000);
	marginNow = parseFloat(array_data[0]['marginBalance'] / 100000000);
	if (marginNow > 0) {
		console.log("existe margin!")
		profitChart = marginNow;
		if (order_count == 0) {
			order_count++;
			console.log("order_count: " + order_count)
			drawChart();
		}
	}
	else profitChart = balanceNow;

	editor.save()
	if (document.getElementById('botCode').value == '') return alert('Enter your code')
	//let wait = await runBot();
	document.getElementById("btn-run").disabled = true;
	document.getElementById("btn-stop").disabled = false;
	document.getElementById("bot-status").innerHTML = "initializing...";
	//if (running) running = false;
	if (stopped) stopped = false;
	await runBot();
	if (!stopped) document.getElementById("bot-status").innerHTML = "running...";
    //document.getElementById("btn-run").disabled = true;
    //document.getElementById("btn-stop").disabled = false;
	//timeOut = setInterval ("runBot();", 10000);	// every 10 seconds..
}
async function runBot() {
	if (!running && !stopped) {
		clearTimeout(timeOut);

		eval(document.getElementById("botCode").value);
		if (!loaded_vars) {
			//eval(document.getElementById("botCode").value);
			init_vars();
			loaded_vars = true;
		}
		try {
			running = true;
			//let array_data = await _ajax_send("bot0.php?run=1&positions=1&orders=1");
			await bot();
	      	//document.getElementById("bot-status").innerHTML = "running...";
	      	//document.getElementById("btn-run").disabled = true;
	      	//document.getElementById("btn-stop").disabled = false;
	      	//console.log (array_data["tmp"]);
	      	timeOut = setInterval ("runBot();", 10000);	// every 10 seconds..
	      	running = false;
	    } catch (error) {
	    	console.log (error);
	    }
	}
}
//----------------------------------------------------
// STOP-bot ...
//----------------------------------------------------
function stopBot() {
	stopped = true;
	running = false;
	loaded_vars = false;	
//	try {
		//let array_data = await _ajax_send("bot0.php?run=0");
		clearTimeout(timeOut);
      	document.getElementById("bot-status").innerHTML = "stopped.";
      	document.getElementById("btn-stop").disabled = true;
      	document.getElementById("btn-run").disabled = false;
      	
//    } catch (error) {
//    	console.log (error);
//    }
}