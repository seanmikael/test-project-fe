import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      token: null,
    },

    mutations: {
      SET_USER(state, user) {
        state.user = user
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      CLEAR_TOKEN(state) {
        state.token = null
      },
    },

    actions: {
      login(vuexContext, authData) {
        return this.$auth
          .loginWith('laravelJWT', {
            data: {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            },
          })
          .then((result) => {
            console.log(result)
            vuexContext.commit('SET_TOKEN', result.data.access_token)
            localStorage.setItem('access_token', result.data.access_token)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() +
                Number.parseInt(result.data.expires_in) * 1000
            )
            Cookie.set('access_token', result.data.access_token)
            Cookie.set(
              'expirationDate',
              new Date().getTime() +
                Number.parseInt(result.data.expires_in) * 1000
            )
          })
          .catch((e) => console.log(e))
      },

      initAuth(vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('access_token='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('access_token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('SET_TOKEN', token)
      },

      async refreshAccessToken({ commit }) {
        try {
          // Get the access token from the cookie
          const accessToken = Cookie.get('access_token')
          if (!accessToken) {
            throw new Error('Access token not found in cookie')
          }

          // Send a POST request to refresh the access token
          const response = await axios.post(
            'http://localhost:8000/api/auth/refresh',
            null,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          const newAccessToken = response.data.access_token

          // Update the access token in both the state and the cookie
          commit('SET_TOKEN', newAccessToken)
          Cookie.set('access_token', newAccessToken)
        } catch (error) {
          console.error(error)
        }
      },

      async logout(vuexContext) {
        // Refresh the access token
        await vuexContext.dispatch('refreshAccessToken')

        // Make an HTTP request to logout
        try {
          await axios.post('http://localhost:8000/api/auth/logout', null, {
            headers: {
              Authorization: `Bearer ${vuexContext.state.token}`,
            },
          })
          // Proceed with logout
          vuexContext.commit('CLEAR_TOKEN')
          Cookie.remove('access_token')
          Cookie.remove('expirationDate')
          if (process.client) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('tokenExpiration')
          }
        } catch (error) {
          // Handle error
          console.error(error)
        }
      },
      // fetch logged in user
      async fetchUser({ commit }) {
        try {
          // Get the access token from the cookie
          const accessToken = Cookie.get('access_token')
          if (accessToken) {
            // Perform API request to fetch user data using the access token
            const response = await axios.get(
              'http://localhost:8000/api/auth/user',
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            // Update the state with the fetched user data
            commit('SET_USER', response.data)
            console.log('Response data:', response.data)
          } else {
            // No access token found, user is not logged in
            commit('SET_USER', null)
          }
        } catch (error) {
          // Handle error while fetching user data
          console.error(error)
        }
      },
    },

    getters: {
      isAuthenticated(state) {
        return state.token != null
      },
      user(state) {
        return state.user
      },
    },
  })
}

export default createStore
