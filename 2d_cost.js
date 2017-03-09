var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {
    x: 0,
    y: 0
  }
});

// minimum x constraint
const X = argv.x;

// minimum y constraint
const Y = argv.y;

var items = [[2, 2, 1], [3, 2, 1], [2, 4, 1]]; // (ci, xi, yi)

// optimal 2D cost
var m = new Array(X + 1);

for (var x = 0; x <= X; x++) {

  m[x] = new Array(Y + 1);

  m[x].fill(Infinity);

}

m[0][0] = 0;

// pseudo-poly O(nXY)
for (var x = 0; x <= X; x++) {

  for (var y = 0; y <= Y; y++) {

    for (var i = 0; i < items.length; i++) {

      // assume item overflows x constraint
      var j = 0;

      // assume item overflows y constraint
      var k = 0;

      // item fits x constraint
      var xi = items[i][1];

      if (xi <= x) j = x - xi;

      // item fits y constraint
      var yi = items[i][2];
      
      if (yi <= y) k = y - yi;

      var tc = items[i][0] + m[j][k];

      m[x][y] = Math.min(m[x][y], tc);

    }

  }

}

console.log("cost:", m[X][Y]);
