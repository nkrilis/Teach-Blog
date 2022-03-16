// When a user hits the login button with their credentials

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // Send the body to the route if the credentials are entered (valid or invalid)
    if (user_name && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  document
    .querySelector('.form')
    .addEventListener('submit', loginFormHandler);

    // // Redirect to signup page
    document
    .querySelector('#signup')
    .addEventListener('click', () => {
      document.location.replace('/signup')
    });
