module.exports = (items, A, B, C) => {

  var n = items.length;

  var table = require('./table_nd.js')(A, B, C);

  // pseudo-poly O(nABC)
  for (var x = 0; x <= A; x++) {

    for (var y = 0; y <= B; y++) {

      for (var z = 0; z <= C; z++) {

        for (var i = 0; i < n; i++) {

          // item's weights
          var xi = items[i][1];
          var yi = items[i][2];
          var zi = items[i][3];

          // item fits or overflows sack
          var j = (xi < x) ? x - xi : 0;
          var k = (yi < y) ? y - yi : 0;
          var l = (zi < z) ? z - zi : 0;

          /* invarient: costs of sacks in table[x][y][z] are equal */

          /* convention: items are stored [cost, idx, idx ...]  */

          // total cost of this sack
          var t = items[i][0] + table.get(j, k, l)[0];

          // true index of best items so far
          var f = table.index(x, y, z);

          // total cost of best sack
          var b = Array.isArray(table.data[f]) ? table.data[f][0] : Infinity;

          // total cost is strictly better
          if (t < b) {
          
            table.set(x, y, z, [t, i]);

          }

          /* invarient: table.data[f] was initialized by some prior call when b=Infinity */

          // total cost is as good
          else if (t === b) {

            table.data[f].push(i);
          
          }

        }

      }

    }

  }

  return table;

}