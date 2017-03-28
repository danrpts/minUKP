module.exports = x => {

  var t = new Array(x + 1);

  t.fill([[Infinity,]]);
  
  t[0] = [[0,]];
  
  return t;

}