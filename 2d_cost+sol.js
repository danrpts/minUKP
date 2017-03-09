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

// optimal xy constraints
var r = Array.from(m);

// optimal choices (backtrack for solution) [don't use from after 2d arrays are created]
var h = Array.from(m);

for (var x = 0; x <= X; x++) {

  m[x] = new Array(Y + 1);

  r[x] = new Array(Y + 1);

  h[x] = new Array(Y + 1);

  m[x].fill(Infinity);

  r[x].fill([Infinity, Infinity]);

}

m[0][0] = 0;

r[0][0] = [0, 0];

h[0][0] = NaN;

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

      // item fits y constraint
      var yi = items[i][2];

      if (xi <= x) j = x - xi;

      if (yi <= y) k = y - yi;

      // total x weight of sack
      var tx = xi + r[j][k][0];
  
      // total y weight of sack
      var ty = yi + r[j][k][1];

      // total sack cost
      var tc = items[i][0] + m[j][k];

      // if sack is competitive
      if (tx <= r[x][y][0] && ty <= r[x][y][1] && tc <= m[x][y]) {

        // update xy weight
        r[x][y] = [tx, ty];

        // update cost
        m[x][y] = tc;

        // save choice
        h[x][y] = i;

      }

    }

  }

}

// optimal solution
var o = [];

var x = X;

var y = Y;

while (x >= 0 && y >= 0) {

  var j = 0;
  var k = 0;

  if (x > 0) j = x;
  if (y > 0) k = y;

  if (j == 0 && k === 0) break;

  var i = h[x][y];

  o.push(i);

  // update weight
  // proof of termination: weight is strictly positive integer
  if (x > 0) x -= items[i][1];

  if (y > 0) y -= items[i][2];

}

console.log("cost:", m[X][Y], "; x weight:", r[X][Y][0], "; y weight:", r[X][Y][1], "; optimal solution:", o);