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

// optimal 2D cost
var m = new Array(X + 1);

for (var x = 0; x <= X; x++) {

  m[x] = new Array(Y + 1);

  for (var y = 0; y <= Y; y++) {

      m[x][y] = new Array(Z + 1);

      m[x][y].fill(Infinity);

  }

}

m[0][0][0] = 0;

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

        // conceptual sack total cost
        var ct = items[i][0] + m[j][k][l];

        // update the minimum sack
        m[x][y][z] = Math.min(m[x][y][z], ct);

      }

    }

  }

}

console.log(m);

console.log("cost:", m[X][Y][Z]);
