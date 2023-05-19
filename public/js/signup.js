const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const fullName = document.querySelector('input[name="full-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="psw"]').value.trim();
    const address = document.querySelector('input[name="address"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const birthday = document.querySelector('input[name="birthday"]').value.trim();
    const profilePicture = document.querySelector('input[name="profile-picture"]').value.trim();

    if (fullName && email && password && address && phone && birthday && profilePicture) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          address,
          phone,
          birthday,
          termsofservice: true,
          profile_picture: profilePicture,
          privatepolicyagreement: true
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);