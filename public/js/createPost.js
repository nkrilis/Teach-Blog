// When a user hits the create post button with their info

const postFormHandler = async (event) => {
    event.preventDefault();
    
    const user_id = document.querySelector('#add_post').getAttribute('data-user');
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    // Send the body to the route if the credentials are entered (valid or invalid)
    if (description && title) {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({ description, user_id, title }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
    .querySelector('#add_post')
    .addEventListener('click', postFormHandler);

