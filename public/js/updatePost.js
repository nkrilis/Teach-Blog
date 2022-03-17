// When a user hits the create post button with their info

const updateFormHandler = async (event) => {
    event.preventDefault();
    
    // const user_id = document.querySelector('#update_post').getAttribute('data-user');
    const post_id = document.querySelector('#update_post').getAttribute('data-post');
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    // Send the body to the route if the credentials are entered (valid or invalid)
    if (description && title) {
      const response = await fetch(`/api/users/update/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ description, user_id, title }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/api/users/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };

  document
    .querySelector('#update_post')
    .addEventListener('click', updateFormHandler);

