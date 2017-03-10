module.exports = (items, A, B, C) => {

  var n = items.length;

  var table = require('./table_3d.js')(A, B, C);

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

          // total cost of sack
          var tc = items[i][0] + table[j][k][l][0][0];

          // total cost is strictly better
          if (tc < table[x][y][z][0][0]) {
          
            table[x][y][z] = [[tc, i]];
          
          }

          // total cost is as good
          else if (tc === table[x][y][z][0][0]) {
          
            table[x][y][z].push([tc, i]);
          
          }

        }

      }

    }

  }

  return table;

}