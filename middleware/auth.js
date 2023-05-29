export default function (context) {
  if (!context.store.getters.isLoggedin) {
    context.redirect('/login')
  }
}
