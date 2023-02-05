// function StormtropperDAO(model) {
//   this.model = model
// }
// StormtropperDAO.prototype.create = (data, callback) => {
//   let model = new this.model(data)
//   model.save((err, result) => {
//     callback(err, result)
//   })
// }
// StormtropperDAO.prototype.find = (query, callback) => {
//   this.model.find(query).exec(callback)
// }
// StormtropperDAO.prototype.findOne = (_id, callback) => {
//   let query = { _id: _id }
//   this.model.findOne(query).exec(callback)
// }
// StormtropperDAO.prototype.update = (_id, data, callback) => {
//   let query = { _id: _id }
//   this.model.update(query, data).exec((err, result) => {
//     callback(err, result)
//   })
// }
// StormtropperDAO.prototype.remove = (_id, callback) => {
//   let query = { _id: _id }
//   this.model.remove(query).remove((err, result) => {
//     callback(err, result)
//   })
// }

// module.exports = function (mongoose) {
//   let Stormtropper = mongoose.model('stormtropper', {
//     name: String,
//     nickname: String,
//     division: [String],
//     patent: String
//   })
//   return new StormtropperDAO(Stormtropper)
// }
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const StormtropperSchema = new Schema({
  id: ObjectId,
  name: String,
  nickname: String,
  division: [String],
  patent: String
})

const StormtropperModel = mongoose.model('stormtroppers', StormtropperSchema)

module.exports = StormtropperModel
