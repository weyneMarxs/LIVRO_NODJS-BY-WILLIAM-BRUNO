// const debug = require('debug')('livro_nodejs:controller')
// const Promise = require('bluebird')
// var handNoteFound = function (data) {
//   if (!data) {
//     var err = new Error('not found')
//     err.status = 404
//     throw err
//   }
//   return data
// }
// function StormtropperController(StormtropperModel) {
//   this.model = Promise.promisifyAll(StormtropperModel)
// }
// StormtropperController.prototype.getAll = (request, response, next) => {
//   this.model
//     .findAsync({})
//     .then(data => {
//       response.json(data)
//     })
//     .catch(next)
// }
// StormtropperController.prototype.getById = (request, response, next) => {
//   let _id = request.params._id
//   this.model
//     .findOneAsync(_id)
//     .then(handNoteFound)
//     .then(data => {
//       response.json(data)
//     })
//     .catch(next)
// }
// StormtropperController.prototype.create = (request, response, next) => {
//   let body = request.body
//   this.model
//     .createAsync(body)
//     .then((err, data) => {
//       response.json(data)
//     })
//     .catch(next)
// }
// StormtropperController.prototype.update = (request, response, next) => {
//   let _id = request.params._id
//   let body = request.body
//   this.model.updateAsync(_id, body).then((err, data) => {
//     response.json(data).catch(next)
//   })
// }
// StormtropperController.prototype.remove = (request, response, next) => {
//   let _id = request.params._id
//   this.model
//     .removeAsync(_id)
//     .then((err, data) => {
//       response.json(data)
//     })
//     .catch(next)
// }
// module.exports = function (StormtropperModel) {
//   return new StormtropperController(StormtropperModel)
// }
const StormtropperModel = require('../models/StormtropperModel')

class StormtropperController {
  async index(request, response) {
    const stormtroppers = await StormtropperModel.find({}, { __v: 0 })
    // console.log(stormtropper)
    return response.status(201).json(stormtroppers)
  }

  async show(request, response) {
    try {
      const { id } = request.params
      const stormtropper = await StormtropperModel.findById(id, { __v: 0 })
      if (!stormtropper) {
        response.status(404).json({ message: 'Invalid Stormtropper ID' })
      }
      response.status(200).json(stormtropper)
    } catch (error) {
      response.status(404).json({ message: 'Invalid Stormtropper ID' })
    }
  }
  async create(request, response) {
    const { name, nickname } = request.body
    if (!name || !nickname) {
      return response
        .status(404)
        .json({ message: 'Name and Nickname are required' })
    }
    const createStormtropper = await StormtropperModel.create(request.body)
    return response.status(200).json(createStormtropper)
  }
  async update(request, response) {
    try {
      const { id } = request.params
      await StormtropperModel.findByIdAndUpdate(id, request.body)
      return response
        .status(200)
        .json({ message: 'Stormtropper has been updated' })
    } catch (error) {
      response.status(404).json({ message: 'internal error' })
    }
  }
  async destroy(request, response) {
    try {
      const { id } = request.params
      const stormtropperDestroy = await StormtropperModel.findByIdAndDelete(id)
      if (!stormtropperDestroy) {
        response.status(404).json({ message: 'Stormtropper does not exists' })
      }
      return response
        .status(200)
        .json({ message: 'stormtropper removed successfully' })
    } catch (error) {
      response.status(404).json({ message: 'Invalid stormtropper ID' })
    }
  }
}

module.exports = new StormtropperController()
