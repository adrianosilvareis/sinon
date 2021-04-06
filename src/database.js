const whereCompare = (where) => item =>  Object.entries(where).every(([key, value]) => item[key].toString().includes(value))

module.exports = (collectionName) => ({
  [collectionName]: {
    nextId: 1,
    collection: [],
    add (item) {
      const data = { id: this.nextId, ...item}
      this.collection.push(data)
      this.nextId++
      return data
    },
    get (id) {
      return this.collection.find(item => item.id === id)
    },
    size() {
      return this.collection.length
    },
    delete(id) {
      const item = this.get(id)
      if (!item) throw new Error(`item ${id} not found in collection ${collectionName}!`)
      this.collection = this.collection.filter(item => item.id !== id)
      return item
    },
    findAll({ where, limit = 10, page = 1} = {}) {
      const offset = limit * (page - 1)
      if (where) {
        return this.collection.slice(offset, limit).filter(whereCompare(where))
      }
      return this.collection.slice(offset, limit)
    }
  }
})
