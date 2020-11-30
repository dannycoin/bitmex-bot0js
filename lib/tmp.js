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