const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'categories'}
  
},)


module.exports = mongoose.model('categories', CategorySchema);
