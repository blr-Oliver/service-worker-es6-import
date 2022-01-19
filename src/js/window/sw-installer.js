export async function installServiceWorker(url) {
  return navigator.serviceWorker.register(url, {type: 'module'})
      .then(registration => {
        console.log('Registration successful.')
        return registration;
      })
      .catch(error => {
        console.log('Registration failed.', error);
      })
}
