const { expect, afterEach } = require('@jest/globals');
const { createSandbox } = require('sinon');
const Todo = require('./todo');
const TodoRepository = require('./todoRepository');

describe('Todo list', () => {
  let sandbox;
  beforeAll(() => {
    sandbox = createSandbox()
  })
  afterEach(() => {
    sandbox.restore();
  })
  it('should call todoRepository list', () => {
    const expectedListReturn = [{ id: 1, name: 'Adriano'}]
    const functionName = 'list'

    const dependencies = {
      todoRepository: new TodoRepository()
    }
    sandbox.stub(dependencies.todoRepository, functionName).returns(expectedListReturn)

    const todo = new Todo(dependencies);

    const result = todo.list()
    expect(result).toEqual(expectedListReturn)
    expect(dependencies.todoRepository[functionName].calledOnce).toBeTruthy()
  });

  it('should call todoRepository insertOne with correct values', () => {
    const expectedReturn = true
    const functionName = 'insertOne'

    const dependencies = {
      todoRepository: new TodoRepository()
    }
    sandbox.stub(dependencies.todoRepository, functionName).returns(expectedReturn)

    const todo = new Todo(dependencies);

    const data = { name: 'adriano' }
    const result = todo.insertOne(data)
    expect(result).toEqual(expectedReturn)
    expect(dependencies.todoRepository[functionName].calledOnceWithExactly(data)).toBeTruthy()
  });

  it('should call todoRepository find with correct values', () => {
    const expectedReturn = { id: 1, name: 'adriano' }
    const functionName = 'find'

    const dependencies = {
      todoRepository: new TodoRepository()
    }
    sandbox.stub(dependencies.todoRepository, functionName).returns(expectedReturn)

    const todo = new Todo(dependencies);

    const expectedId = 1
    const result = todo.find(expectedId)
    expect(result).toEqual(expectedReturn)
    expect(dependencies.todoRepository[functionName].calledOnceWithExactly(expectedId)).toBeTruthy()
  });
});