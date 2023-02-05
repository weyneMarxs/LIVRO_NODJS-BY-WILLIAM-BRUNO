const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose
  .connect('mongodb://127.0.0.1:27017/livro_nodejs')
  .then(() => console.log('successful MONGODB connection!'))
  .catch(err => console.log(err.message))
module.exports = mongoose
