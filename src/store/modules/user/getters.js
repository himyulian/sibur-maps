export function getCurrentUser (state) {
  return state.currentUser
}

export function getCurrentUserProps (state) {
  if (state.currentUser) return state.currentUser.UserProfileProperties.results.map(val => ({
    Key: val.Key,
    Value: val.Value
  }))
  return {}
}

export function getCurrentUserCompany (state) {
  if (state.currentUser) return state.currentUser.UserProfileProperties.results.filter(v => v.Key === 'Company')[0].Value
  return ''
}
