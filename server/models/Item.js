const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {type: String},
  icon: {type: String}
  
},)


module.exports = mongoose.model('item', CategorySchema);
