// export default function ({ store, redirect }) {
//   console.log('Middleware: protect')
//   console.log('isAuthenticated:', store.getters['auth/isAuthenticated'])

//   // Check if the user is authenticated based on the access token in the state
//   if (!store.getters['auth/isAuthenticated']) {
//     console.log('Redirecting to /auth/login')
//     console.log('State Access Token:', store.state.auth.accessToken)

//     return redirect('/auth/login')
//   }
//   console.log('State Access Token:', store.state.auth.accessToken)
// }
