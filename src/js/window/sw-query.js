export function queryServiceWorker() {
  fetch('/generated.json')
      .then(response => {
        response.json().then(data => {
          document.querySelector('#output').textContent = data['value'];
        });
      })
      .catch(error => {
        console.error(error);
      });
}
