import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
  loggedIn: false,
  user: null,
  accessToken: null,
})

export const mutations = {
  SET_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
  CLEAR_ACCESS_TOKEN(state) {
    state.accessToken = null
  },
}

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await this.$auth.loginWith('laravelJWT', {
        data: {
          email,
          password,
        },
      })
      console.log('Login response:', response)

      // Store the access token in a cookie
      const accessToken = response.data.access_token
      Cookies.set('access_token', accessToken, { expires: 1 })
      console.log('Access Token:', accessToken)
      commit('SET_LOGGED_IN', true)
      commit('SET_USER', response.data.user)
      commit('SET_ACCESS_TOKEN', accessToken)
    } catch (error) {
      console.error(error)
    }
  },

  async logout({ commit, state, dispatch }) {
    try {
      await dispatch('refreshAccessToken')
      await axios.post('http://localhost:8000/api/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      })
      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
      commit('CLEAR_ACCESS_TOKEN')

      // Remove the access token cookie
      Cookies.remove('access_token')
    } catch (error) {
      console.error(error)
    }
  },

  // ...

  async refreshAccessToken({ commit }) {
    try {
      // Get the access token from the cookie
      const accessToken = Cookies.get('access_token')
      if (!accessToken) {
        throw new Error('Access token not found in cookie')
      }

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
      commit('SET_ACCESS_TOKEN', newAccessToken)
      Cookies.set('access_token', newAccessToken, { expires: 1 })
    } catch (error) {
      console.error(error)
    }
  },

  async fetchUser({ commit }) {
    try {
      // Get the access token from the cookie
      const accessToken = Cookies.get('access_token')

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
        commit('SET_USER', response.data.user)
        commit('SET_LOGGED_IN', true)
      } else {
        // No access token found, user is not logged in
        commit('SET_USER', null)
        commit('SET_LOGGED_IN', false)
      }
    } catch (error) {
      // Handle error while fetching user data
      console.error(error)
    }
  },
}

export const getters = {
  loggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
  isAuthenticated: (state) => state.accessToken !== null,
}
