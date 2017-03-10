module.exports = (x, y, z) => {

  var t = new Array(x + 1);

  for (var i = 0; i <= x; i++) {

    t[i] = new Array(y + 1);

    for (var j = 0; j <= y; j++) {

      t[i][j] = new Array(z + 1);

      t[i][j].fill([[Infinity,]]);

    }

  }

  t[0][0][0] = [[0,]];

  return t;

}