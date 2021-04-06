const { expect, afterEach } = require('@jest/globals');
const { createSandbox } = require('sinon');
const Todo = require('./todo');
const TodoRepository = require('./todoRepository');

describe('todoRepository', () => {
  let sandbox;
  beforeAll(() => {
    sandbox = createSandbox()
  })
  afterEach(() => {
    sandbox.restore();
  })
  it('should call todoRepository list', () => {
    const expectedListReturn = [{ id: 1, name: 'Adriano'}]
    const functionName = 'findAll'

    const todo = new TodoRepository()
    sandbox.stub(todo.db.todoList, functionName).returns(expectedListReturn)

    const result = todo.list()
    expect(result).toEqual(expectedListReturn)
    expect(todo.db.todoList[functionName].calledOnce).toBeTruthy()
  });

  it('should call todoRepository insertOne with correct values', () => {
    const expectedReturn = true
    const functionName = 'add'

    const todo = new TodoRepository()
    sandbox.stub(todo.db.todoList, functionName).returns(expectedReturn)

    const data = { name: 'adriano' }
    const result = todo.insertOne(data)
    expect(result).toEqual(expectedReturn)
    expect(todo.db.todoList[functionName].calledOnceWithExactly(data)).toBeTruthy()
  });

  it('should call todoRepository find with correct values', () => {
    const expectedReturn = { id: 1, name: 'adriano' }
    const functionName = 'get'

    const todo = new TodoRepository()
    sandbox.stub(todo.db.todoList, functionName).returns(expectedReturn)

    const expectedId = 1
    const result = todo.find(expectedId)
    expect(result).toEqual(expectedReturn)
    expect(todo.db.todoList[functionName].calledOnceWithExactly(expectedId)).toBeTruthy()
  });
});