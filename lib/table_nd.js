var ndarray = require('ndarray');

module.exports = (...ds) => {

  // clamp and add 1 for 0th dimension
  var s = ds.map((d) => { return (d > 0) ? d + 1 : 1 });

  /* convention: items are stored [cost, idx, idx, ...] */

  return new ndarray([[0]], s);

}