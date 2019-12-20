const users = [
  {name: 'Igor', age: 30, email: 'sotnikov_k@outlook.com'},
  {name: 'Elena', age: 33, email: 'comicon2508@gmail.com'}
]

const Todo = require('../models/todo')

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users
    }
  },

  random({min, max, count}) {
    const arr = []
    for(let i = 0; i < count; i++){
      const random = Math.random() * (max-min) + min
      arr.push(random)
    }
    return arr
  },

  addTestUser({user: {name, email}}) {
    const user = {
      name,
      email,
      age: Math.ceil(Math.random() * 30)
    }
    users.push(user)
    return user
  },

  async getTodos() {
    try{
      return await Todo.findAll()
    } catch(err) {
      throw new Error('Fetch todos is not available')
    }
  },

  async createTodo({todo:{title}}) {
    try{
      const todo = await Todo.create({
        title,
        done: false
      })
      return todo
    } catch(err) {
      throw new Error('Title is required')
    }
  },

  async completeTodo({id}) {
    try{
      const todo = await Todo.findByPk(id)
      todo.done = true
      await todo.save()
      return todo
    } catch(err) {
      throw new Error ('ID is required')
    }
  },
  
  async deleteTodo({id}) {
    try{
      const todo = await Todo.findByPk(id)
      await todo.destroy()
      return true
    } catch(err) {
      return false
    }
  }
}