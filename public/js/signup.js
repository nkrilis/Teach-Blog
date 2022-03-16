const signupFormHandler = async (event) => {

    event.preventDefault();
  
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (user_name && password) {
      const response = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
         user_name,
         password
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/login");
      } else {
        alert(`Failed to sign up, please fill in all data. ${category}`);
      }
    }
  };
  
  
  document
  .querySelector('.form')
  .addEventListener('submit', signupFormHandler);
  
  