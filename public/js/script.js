console.log('Hello World');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.onsubmit = e => {
  e.preventDefault();

  const location = searchInput.value;
  messageTwo.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
      return res.json();
    })
    .then(({ error, forecast, location }) => {
      if (error) return (messageTwo.textContent = error);

      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
};
