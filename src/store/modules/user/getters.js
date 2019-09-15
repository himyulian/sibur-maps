export function getCurrentUser (state) {
  return state.currentUser
}

export function getCurrentUserProps (state) {
  return state.currentUser && state.currentUser.UserProfileProperties.results.map(val => ({
    Key: val.Key,
    Value: val.Value
  })) || {}
}

export function getCurrentUserCompany (state) {
  return state.currentUser && state.currentUser.UserProfileProperties.results.filter(v => v.Key === 'Company')[0].Value || ''
}
