

const button = document.getElementById("checkout-button")
button.addEventListener("click", () => {
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          {id: 1, quantity: 2},
          {id: 2, quantity: 1}
        ]
      })
    })
.then(res =>{
  if(res.ok) return res.json()
}).then (({ url }) => {
  window.location = url
}). catch(err => next(err))
})


