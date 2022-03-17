// When a user hits the comment button with their info

const commentFormHandler = async (event) => {
    event.preventDefault();
    
    // const info = document.querySelector('#add_comment');

    const post_id = document.querySelector('#add_comment').getAttribute('data-post');
    const user_id = document.querySelector('#add_comment').getAttribute('data-user');

    const description = document.querySelector('#comment').value.trim();
  
    // Send the body to the route if the credentials are entered (valid or invalid)
    if (description) {
      const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({ description, user_id, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Please enter something first');
      }
    }
  };

  document
    .querySelector('#add_comment')
    .addEventListener('click', commentFormHandler);

