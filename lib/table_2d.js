module.exports = (x, y) => {

  var t = new Array(x + 1);

  for (var i = 0; i <= x; i++) {

    t[i] = new Array(y + 1);

    t[i].fill([[Infinity,]]);

  }

  t[0][0] = [[0,]];

  return t;

}