import axios from "axios";

// Make a request for a user with a given ID
axios.get('http://localhost:5173/api/theaters/1')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getTheaters() {
  try {
    const response = await axios.get('/theaters/1');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}