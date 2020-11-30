const symbol = "XBTUSD";
const apiKey = "6pN8o46aE_plxos-o7HfgQsn";
const apiSecret = "Yryhq6cwCN362yVmg5Uo4bxeHbLXBtPivZMa0XtiuKW5l2D2";

var proxy = true;
var PROXY_URL = "http://localhost:8010/proxy";
var API_URL = "https://testnet.bitmex.com";
//const API_URL = "http://localhost:8010/proxy";
const API_PATH = "/api/v1/";

//-------------------------------------------------------------------------------------------------
async function hmac_256(key, message, type = false) {

	const getUtf8Bytes = str =>
	  new Uint8Array(
	    [...unescape(encodeURIComponent(str))].map(c => c.charCodeAt(0))
	  );

	const keyBytes = getUtf8Bytes(key);
	const messageBytes = getUtf8Bytes(message);

	const cryptoKey = await crypto.subtle.importKey(
	  'raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' },
	  true, ['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);

	if (type) // to lowercase hexits
		return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
	else
	// to base64
		return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

//-------------------------------------------------------------------------------------------------
function microtime(getAsFloat) {
    var s, now, multiplier;

    if(typeof performance !== 'undefined' && performance.now) {
        now = (performance.now() + performance.timing.navigationStart) / 1000;
        multiplier = 1e6; // 1,000,000 for microseconds
    }
    else {
        now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
        multiplier = 1e3; // 1,000
    }

    // Getting microtime as a float is easy
    if(getAsFloat) {
        return now;
    }

    // Dirty trick to only get the integer part
    s = now | 0;

    return (Math.round((now - s) * multiplier ) / multiplier ) + ' ' + s;
}

//--------------------------------------------------------------------------------------------------
function generateNonce() {

	//nonce = (string) number_format(round(microtime(true) * 100000), 0, '.', '');
	let nonce = Math.round(microtime(true) * 100000).toString();

	return nonce;
}

//-------------------------------------------------------------------------------------------------
async function _ajax_send_public(data) {

	let funcs = data["function"];

	let params = new URLSearchParams(data["params"]);
	params = params.toString();
	console.log(params);

	let options = { 
		headers: {
			'Connection': 'Keep-Alive',
			'Keep-Alive': '90'
			}
		}

	if (proxy) API_URL = "";
	else PROXY_URL = "";

	let url = PROXY_URL + API_URL + API_PATH + funcs + '?' + params;

	let res = await fetch(url, options)
		.then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))

	let response = await res.json();
	console.log(response);
	//return res.json();
	return response;
}

//-------------------------------------------------------------------------------------------------
async function _ajax_authQuery(data) {

    let method = data['method'];
    let func = data['function'];
    let params = "";
    let post = "";

    if (method == "GET" || method == "POST" || method == "PUT") {
      params = new URLSearchParams(data["params"]);
    }
    else if(method == "DELETE") {
      params = JSON.stringify(data['params']);
    }

    if (proxy) API_URL = "";
    else PROXY_URL = "";

    let path = API_PATH + func;
    let url = PROXY_URL + API_URL + API_PATH + func;
    
    //console.log ("Object.keys(data['params']).length: " + Object.keys(data["params"]).length)

    if (method == "GET" && Object.keys(data["params"]).length >= 1) {
    	url += "?" + params;
    	path += "?" + params;
    }
    
    let nonce = generateNonce();
    //console.log ("nonce: " + nonce)
    
    if (method == "GET") {
      post = "";
    }
    else {
      post = params;
    }
    //console.log("url: " + url)
    //console.log ("method: " + method)
    //console.log ("func: " + func)
    //console.log ("params: " + params)
    //console.log ("post: " + post)

    const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
    //console.log ("expires: " + expires)

    let sign = await hmac_256(apiSecret, method+path+nonce+post, true);
    //let sign = await hmac_256(apiSecret, method+API_PATH+func+"?"+JSON.stringify(params)+expires+post, true);

    //console.log("sign: " + sign)

    /*headers = [];

    headers["api-signature"] = sign;
    headers["api-key"] = apiKey;
    headers["api-nonce"] = nonce;

    headers["Connection"] = 'Keep-Alive';
    headers["Keep-Alive"] = 90;*/

    let options = {
    	method: data['method'], 
		headers: {
			//'accept': 'application/json',
			'api-signature': sign,
			//'api-expires': expires,
			'api-key': apiKey,
			'api-nonce': nonce,
			'Connection': 'Keep-Alive',
			'Keep-Alive': '90'
			},
			keepalive: true
		} 

    //curl_reset($this->ch);
    //curl_setopt($this->ch, CURLOPT_URL, $url);
    if (data['method'] == "GET") {
    	//options.headers["Content-Type"] = "text/plain;charset=UTF-8";
    	//options.headers['Content-Type'] = 'application/json';
    }
    if(data['method'] == "POST") {
      //curl_setopt($this->ch, CURLOPT_POST, true);
      //curl_setopt($this->ch, CURLOPT_POSTFIELDS, $post);
      options.body = post;
    }
    if(data['method'] == "DELETE") {
      /*curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, "DELETE");
      curl_setopt($this->ch, CURLOPT_POSTFIELDS, $post);
      $headers[] = 'X-HTTP-Method-Override: DELETE';*/
      options.headers['Content-Type'] = 'application/json';
      options.headers['X-HTTP-Method-Override'] = "DELETE";
      options.body = post;
    }
    if(data['method'] == "PUT") {
      /*curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, "PUT");
      //curl_setopt($this->ch, CURLOPT_PUT, true);
      curl_setopt($this->ch, CURLOPT_POSTFIELDS, $post);
      $headers[] = 'X-HTTP-Method-Override: PUT';*/
      options.headers['X-HTTP-Method-Override'] = "PUT";
      options.body = post;
    }
    /*curl_setopt($this->ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER , false);
    curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
    if(!empty($this->proxy)) {
      curl_setopt($this->ch, CURLOPT_PROXY, $this->proxy);
    }*/
    //$return = curl_exec($this->ch);
    
    //let url = PROXY_URL + API_URL + API_PATH + funcs + '?' + params;

	let res = await fetch(url, options)
		.then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))

    //return $return;
    //console.log(res.headers.get('Content-Type'));
    return res.json();
 }

//------------------------------------------------------------------------------------------------
async function getTicker() {
  let data = [];
  data ["function"] = "instrument";
  data ["params"] = {
    'symbol': symbol
    //'count': 1
  } 

  let array_data = await _ajax_send_public(data);

  return array_data[0]["lastPrice"];
}

/*------------------------------------------------------------------------------------------------------
* Get Candles
*
* Get candles history
*
* @param $timeFrame can be 1m 5m 1h
* @param $count candles count
* @param $offset timestamp conversion offset in seconds(s*1000) or minutes(m*60000) or hours(h*60*60000) )
*
* @return candles array (from past to present)
*/
async function getCandles(timeFrame, count, offset = 0) {
  let data = [];

  data['function'] = "trade/bucketed";
  data['params'] = {
    "symbol": symbol,
    "count": count,
    "binSize": timeFrame,
    "partial": "false",
    "reverse": "true"
  }

  let array_data = await _ajax_send_public(data);

  if (offset != 0) {
    let candles = [];
    let candleI = 0;
    let date = null;

    // Converting
    array_data.forEach(item => {

      date = new Date(item['timestamp']);
      date = new Date(date.getTime() + offset*3600000); // add hours..

      candles[candleI] = {
        'timestamp': date.toLocaleString().replaceAll("/", "-"), // Local time human-readable time stamp
        //'timestamp' => $item['timestamp'],
        'time': date.getTime().toString(),
        'open': item['open'],
        'high': item['high'],
        'close': item['close'],
        'low': item['low']
      }
      candleI++;
    });

    // Sorting candles from the past to the present
    // ksort($candles);

    return candles;
  } else return array_data;
}

/*------------------------------------------------------------------------------------------------------
* Get UserInfo
*
* Get your account user info
*
* @return array
*/
async function getUserInfo() {
	let data = [];

	data['method'] = "GET";
	data['function'] = "user";
	//$data['params'] = null;
	data['params'] = {
	  //"id" => $id
	}

	let array_data = await _ajax_authQuery(data);

	return array_data;
}

/*------------------------------------------------------------------------------------------------------
* Get Wallet
*
* Get your account wallet
*
* @return array
*/
async function getWallet() {
	let data = [];
	let array_data = [];

	data['method'] = "GET";
	data['function'] = "user/walletHistory";
	data['params'] = {
	  "currency": "XBt",
	  "count": 1
	}

	array_data = await _ajax_authQuery(data);

	return array_data;
}

/*------------------------------------------------------------------------------------------------------
 * Get Positions
 *
 * Get all of your positions
 *
 * @return positions array
*/
async function getPositions() {
  let data = [];
  //let positions = [];

  data['method'] = "GET";
  data['function'] = "position";
  data['params'] = {
    "symbol": symbol
  }

  let positions = await _ajax_authQuery(data);

  return positions;
}

/*------------------------------------------------------------------------------------------------------
* Get Open Positions
*
* Get all your open positions
*
* @return open positions array
*/
async function getOpenPositions() {
  let data = [];

  data['method'] = "GET";
  data['function'] = "position";
  data['params'] = {
    "symbol": symbol
  }

  let positions = await _ajax_authQuery(data);

  if (!Array.isArray(positions))
    return false;

  let openPositions = [];

  positions.forEach(position => {
    if(typeof(position['isOpen']) !== 'undefined' && position['isOpen'] == true) {
      openPositions.push(position);
    }
  });

  if (!Object.keys(openPositions).length) return false;

  return openPositions;
}


/*------------------------------------------------------------------------------------------------------
 * Get Orders
 *
 * Get last 100 orders
 *
 * @return orders array (from the past to the present)
*/
async function getOrders(count = 100) {
  let data = [];

  data['method'] = "GET";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "count": count,
    "reverse": "true"
  }
  
  let orders = await _ajax_authQuery(data);

  return orders;
  //return array_reverse($this->authQuery($data));
}

/*------------------------------------------------------------------------------------------------------
* Get Open Orders
*
* Get open orders from the last 100 orders
*
* @return open orders array
*/
async function getOpenOrders(count = 100) {
  let data = [];

  data['method'] = "GET";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "count": count,
    "reverse": "true"
  }

  let orders = await _ajax_authQuery(data);

  //console.log(orders);

  let openOrders = [];

  //if (!is_array($orders)) return $openOrders;
  
  orders.forEach (order => {
    if (order['ordStatus'] == 'New' || order['ordStatus'] == 'PartiallyFilled') {
      openOrders.push(order);
    }
  });

  if (!Object.keys(openOrders).length) return false;

  return openOrders;
  //return $orders;
}

/*------------------------------------------------------------------------------------------------------
* Create Order
*
* Create new order
*
* @param $type can be "Limit"
* @param $side can be "Buy" or "Sell"
* @param $price BTC price in USD
* @param $quantity should be in USD (number of contracts)
* @param $maker forces platform to complete your order as a 'maker' only
*
* @return new order array
*/
async function createOrder(type, side, price, quantity, maker = false) {
  let data = [];

  data['method'] = "POST";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "side": side,
    "price": price,
    "orderQty": quantity,
    "ordType": type
  }

  if(maker) {
    data['params']['execInst'] = "ParticipateDoNotInitiate";
  }

   let order_array = await _ajax_authQuery(data);

   return order_array;
}

/*------------------------------------------------------------------------------------------------------
* Create Stop Market Order
*
* Create new stop market order
*
* @param $stopPrice BTC trigger price
* @param $quantity should be in USD (number of contracts)
*
* @return new order array
*/
async function createStopMarketOrder(quantity, stopPrice, instructions = "LastPrice, ReduceOnly") {
  let data = [];

  data['method'] = "POST";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "stopPx": stopPrice,
    "orderQty": quantity,
    "ordType": "Stop"
  }

  if (instructions) {
    data['params']['execInst'] = instructions;
  }

  let order_array = await _ajax_authQuery(data);

  return order_array;
}

/*------------------------------------------------------------------------------------------------------
* Create Stop Limit Order
*
* Create new stop limit order
*
* @param $quantity is a number of contracts
* @param $stopPrice is an order trigger price
* @param $price is an order execution price
*
* @return new order array
*/
async function createStopLimitOrder(side, quantity, stopPrice, price, instructions = "LastPrice, ReduceOnly") {
  let data = [];

  data['method'] = "POST";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "side": side,
    "stopPx": stopPrice,
    "price": price,
    "orderQty": quantity,
    "ordType": "StopLimit",
    "timeInForce": "GoodTillCancel"
    //"currency" => "USD",
    //"settlCurrency" => "XBt",
    //"leavesQty" => $quantity,
    //"exDestination" => "XBME",
    //"ordStatus" => "New"
  }

  //if($instructions) {
    data['params']['execInst'] = instructions;
  //}

   let order_array = await _ajax_authQuery(data);

   return order_array;
}

/*------------------------------------------------------------------------------------------------------
* Create Take Proft Order
*
* Create new take-profit order
*
* @param $quantity is a number of contracts
* @param $stopPrice is an order trigger price
* @param $price is an order execution price
*
* @return new order array
*/

async function createTakeProfitOrder(side, quantity, stopPrice, price, instructions = "LastPrice, ReduceOnly") {
  let data = [];

  data['method'] = "POST";
  data['function'] = "order";
  data['params'] = {
    "symbol": symbol,
    "side": side,
    "stopPx": stopPrice,
    "price": price,
    "orderQty": quantity,
    "ordType": "LimitIfTouched",
    "timeInForce": "GoodTillCancel"
    //"currency" => "USD",
    //"settlCurrency" => "XBt",
    //"leavesQty" => $quantity,
    //"exDestination" => "XBME",
    //"ordStatus" => "New"
  }

  //if($instructions) {
    data['params']['execInst'] = instructions;
  //}

   let order_array = await _ajax_authQuery(data);

   return order_array;
}

/*------------------------------------------------------------------------------------------------------
* Cancel All Open Orders
*
* Cancels all of your open orders
*
* @param $text is a note to all closed orders
*
* @return all closed orders arrays
*/
async function cancelAllOpenOrders(text = "") {
  let data = [];

  data['method'] = "DELETE";
  data['function'] = "order/all";
  data['params'] = {
    "symbol": symbol,
    "text": text
  }

   let close_array = await _ajax_authQuery(data);

   return close_array;
}

/*------------------------------------------------------------------------------------------------------
* Close Position
*
* Close open position
*
* @return array
*/
async function closePosition(price) {
  let data = [];

  data['method'] = "POST";
  data['function'] = "order/closePosition";
  data['params'] = {
    "symbol": symbol,
    "price": price
  }

  let close_array = await _ajax_authQuery(data);

  return close_array;
}