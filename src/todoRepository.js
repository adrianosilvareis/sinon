const database = require('./database')

module.exports = class TodoRepository {
  constructor() {
    this.db = database('todoList')
  }

  list () {
    return this.db.todoList.findAll()
  }

  insertOne (data) {
    return this.db.todoList.add(data)
  }

  find (id) {
    return this.db.todoList.get(id)
  }
}