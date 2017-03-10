module.exports = (items, A, B) => {

  var n = items.length;

  var table = require('./table_2d.js')(A, B);

  // pseudo-poly O(nAB)
  for (var x = 0; x <= A; x++) {

    for (var y = 0; y <= B; y++) {

      for (var i = 0; i < n; i++) {

        // item's weights
        var xi = items[i][1];
        var yi = items[i][2];

        // item fits or overflows sack
        var j = (xi < x) ? x - xi : 0;
        var k = (yi < y) ? y - yi : 0;

        /* invarient: costs of sacks in table[x][y] are equal */

        /* convention: items are stored [cost, idx, idx ...]  */

        // total cost of sack
        var tc = items[i][0] + table[j][k][0];

        // total cost is strictly better
        if (tc < table[x][y][0]) {
        
          table[x][y] = [[tc, i]];
        
        }

        // total cost is as good
        else if (tc === table[x][y][0]) {
        
          table[x][y].push([tc, i]);
        
        }

      }

    }

  }

  return table;

}