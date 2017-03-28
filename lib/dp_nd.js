
// arbitrary nested loops
function iterate (bounds, f) {
  const recurse = (bs, is, i) => {
    if (bs.length < 1) f.call(this, is);
    else {

      // shallow copy
      var tail = bs.slice(1);

      // purposeful less than or equal
      for (is[i] = 0; is[i] <= bs[0]; is[i]++) {
        recurse(tail, is, i + 1);
      }
    }
  }
  recurse(bounds, [], 0);
}

module.exports = function (items, ...constraints) {

  var n = items.length;

  var table = require('./table_nd.js').apply(this, constraints);

  iterate(constraints, function (ws) {

    for (var i = 0; i < n; i++) {

      // i, j, k, ...
      var is = ws.map((w, l) => (items[i][l + 1] < w) ? w - items[i][l + 1] : 0);

      /* invariant: costs of sacks in table[...ws] are equal */

      /* convention: items are stored [cost, idx, idx ...]  */

      // total cost of this sack
      var t = items[i][0] + table.get(...is)[0];

      // true index of best items so far
      var f = table.index(...ws);

      // total cost of best sack
      var b = Array.isArray(table.data[f]) ? table.data[f][0] : Infinity;

      // total cost is strictly better
      if (t < b) {

        table.set(...ws, [t, i]);

      }

      /* invariant: table.data[f] was initialized by some prior call when b=Infinity */

      // total cost is as good
      else if (t === b) {

        table.data[f].push(i);
      
      }

    }

  });

  return table;

}