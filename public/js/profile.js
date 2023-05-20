async function logout() {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        location.reload(); // Refresh the page
      } else {
        throw new Error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);



