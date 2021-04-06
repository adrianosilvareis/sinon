module.exports = class Todo {
  #todoRepository

  constructor({ todoRepository }) {
    this.#todoRepository = todoRepository
  }

  list () {
    return this.#todoRepository.list()
  }
  
  insertOne(data) {
    return this.#todoRepository.insertOne(data)
  }

  find (id) {
    return this.#todoRepository.find(id)
  }
}