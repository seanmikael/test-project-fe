import axios from 'axios'

class AuthService {
  static register(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/register',
          (user = {
            email: user.email,
            password: user.password,
            name: user.name,
          })
        )
        .then((res) => {
          console.log('Register success.')
          console.log(res.data.user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static login(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          '/login',
          (user = {
            email: user.email,
            password: user.password,
          })
        )
        .then((res) => {
          console.log('Login success.')
          console.log(res.data.user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default AuthService
