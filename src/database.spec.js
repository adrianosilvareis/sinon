const { expect } = require('@jest/globals');
const database = require('./database');

describe('database', () => {
  let db;
  const collectionName = 'collection'
  beforeEach(() => {
    db = database('collection')
  })

  it('should add item and increment id', () => {
    const data = { name: 'adriano'}
    db[collectionName].add(data)
    expect(db[collectionName].findAll()).toEqual([{ id:1, name: 'adriano' }])
    expect(db[collectionName].nextId).toBe(2)
  });

  it('should increment nextId when add item', () => {
    const data = { name: 'adriano'}
    db[collectionName].add(data)
    db[collectionName].add(data)
    db[collectionName].add(data)
    expect(db[collectionName].size()).toBe(3)
    expect(db[collectionName].nextId).toBe(4)
  });

  it('should return filtered item when call "get" method', () => {
    const SEARCHED_ID = 2
    db[collectionName].add({ name: 'adriano'})
    db[collectionName].add({ name: 'zezinho'})
    db[collectionName].add({ name: 'joaozinho'})
    expect(db[collectionName].get(SEARCHED_ID)).toEqual({ id: SEARCHED_ID, name: 'zezinho' })
  });

  it('should item deleted', () => {
    const DELETED_ID = 2
    db[collectionName].add({ name: 'adriano'})
    db[collectionName].add({ name: 'zezinho'})
    db[collectionName].add({ name: 'joaozinho'})
    expect(db[collectionName].delete(DELETED_ID)).toEqual({ id: DELETED_ID, name: 'zezinho' })
    expect(db[collectionName].size()).toBe(2)
    expect(db[collectionName].nextId).toBe(4)
  });

  it('should return filtered collection when call filterAll', () => {
    const names = ['adriano', 'zezinho', 'joaozinho', 'marizinha', 'polida', 'lele', 'maria', 'penhazinha', 'celmaminha']
    
    for (const name of names) {
      db[collectionName].add({ name})
    }
    const condition1 = { where: { name: 'a' }, limit: 2 }
    const expectedReturn1 = [{ id: 1, name: 'adriano' }]
    expect(db[collectionName].findAll(condition1)).toEqual([{ id: 1, name: 'adriano' }])

    const condition2 = { limit: 2 }
    const expectedReturn2 = [ ...expectedReturn1, { id: 2, name: 'zezinho' }]
    expect(db[collectionName].findAll(condition2)).toEqual(expectedReturn2)
  });

  it('should throw if delete item non-existent', () => {
    expect(db[collectionName].delete.bind(db[collectionName], 1)).toThrowError("item 1 not found in collection collection!")
  });
});