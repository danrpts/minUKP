var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {
    x: 0,
    y: 0,
    z: 0
  }
});

// minimum x constraint
const X = argv.x;

// minimum y constraint
const Y = argv.y;

// minimum y constraint
const Z = argv.z;

var items = [[2, 2, 1, 1], [3, 2, 1, 1], [2, 4, 1, 1]]; // [ci, xi, yi, zi]


// optimal cost totals
var m = new Array(X + 1);

// optimal xyz weight totals
var n = Array.from(m);

// optimal index choices (backtrack for solution)
var p = Array.from(m);

for (var x = 0; x <= X; x++) {

  m[x] = new Array(Y + 1);
  n[x] = new Array(Y + 1);
  p[x] = new Array(Y + 1);

  for (var y = 0; y <= Y; y++) {

      m[x][y] = new Array(Z + 1);
      n[x][y] = new Array(Z + 1);
      p[x][y] = new Array(Z + 1);

      m[x][y].fill(Infinity);
      n[x][y].fill([Infinity, Infinity, Infinity]);

  }

}

m[0][0][0] = 0;
n[0][0][0] = [0, 0, 0];
p[0][0][0] = NaN;

// pseudo-poly O(nXYZ)
for (var x = 0; x <= X; x++) {

  for (var y = 0; y <= Y; y++) {

    for (var z = 0; z <= Z; z++) {

      for (var i = 0; i < items.length; i++) {

        // when item's xyz weights overflow
        var j = 0;
        var k = 0;
        var l = 0;

        // item xyz weights
        var xi = items[i][1];
        var yi = items[i][2];
        var zi = items[i][3];

        // when item's xyz weights fit
        if (xi <= x) j = x - xi;
        if (yi <= y) k = y - yi;
        if (zi <= z) l = z - zi;

        // conceptual sack base weights
        var w = n[j][k][l];

        // conceptual sack weighted
        var wxi = xi + w[0];
        var wyi = yi + w[1];
        var wzi = zi + w[2];

        // conceptual sack cost
        var wci = items[i][0] + m[j][k][l];

        // optimal sack weights
        var v = n[x][y][z];

        // when conceptual sack is competitive with optimal sack
        if (wxi <= v[0] && wyi <= v[1] && wyi <= v[2] && wci <= m[x][y][z]) {

          // update optimal cost
          m[x][y][z] = wci;

          // update weights
          n[x][y][z] = [wxi, wyi, wzi];

          // save choice
          p[x][y][z] = i;

        }

      }

    }

  }

}

// optimal solution
var o = [];

var x = X;

var y = Y;

var z = Z;

while (x >= 0 && y >= 0 && z >= 0) {

  var j = 0;
  var k = 0;
  var l = 0;

  if (x > 0) j = x;
  if (y > 0) k = y;
  if (z > 0) l = z;

  if (j == 0 && k === 0 && l === 0) break;

  var i = p[x][y][z];

  // item is optimal
  o.push(i);

  // update weight
  if (x > 0) x -= items[i][1];
  if (y > 0) y -= items[i][2];
  if (z > 0) z -= items[i][3];

}

console.log(p);

console.log("cost:", m[X][Y][Z],
            "; x weight:", n[X][Y][Z][0],
            "; y weight:", n[X][Y][Z][1],
            "; z weight:", n[X][Y][Z][2],
            "; optimal solution:", o);
