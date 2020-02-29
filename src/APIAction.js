import axios from 'axios'

const query = require('querystring')

export class APIAction {
  userLogin (user) {
    const q = 'http://localhost:3000/api/v1/login'
    return axios.post(q, query.stringify(user))
  }

  getExercises () {
    const q = 'http://localhost:3000/api/v1/exercises'
    return axios.get(q)
  }

  getOneExercise (id) {
    const q = 'http://localhost:3000/api/v1/exercise/' + id
    return axios.get(q)
  }

  addNewExercise (exercice) {
    const q = 'http://localhost:3000/api/v1/exercise'
    return axios.post(q, query.stringify(exercice))
  }
}
