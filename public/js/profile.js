// get modal
let modal = document.getElementById("eventModal");

// get button that opens the modal
let btn = document.getElementById("createEvent");

// get the button that submits the form
let submitBtn = document.getElementById("submitEvent");

// get the 'body' element (we'll use this to prevent scrolling when the modal is open)
let body = document.getElementsByTagName("body")[0];

// open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  body.style.overflow = "hidden";
}

function convert12hrTo24hr(time12hr) {
  const [time, modifier] = time12hr.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

submitBtn.onclick = async function(event) {
  event.preventDefault(); // prevent form from submitting and refreshing the page

  // Fetch the user_id from the current session
  try {
    const response = await fetch('/api/session');
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (data.user_id) {
      let eventName = document.getElementById("eventName").value;
      let eventDate = document.getElementById("eventDate").value;
      let startTime = document.getElementById("startTime").value;
      let endTime = document.getElementById("endTime").value;
      let eventLocation = document.getElementById("eventLocation").value;

     let startTime24 = convert12hrTo24hr(startTime);
     let endTime24 = convert12hrTo24hr(endTime);

      if (eventName && eventDate && startTime && endTime && eventLocation) {
        try {
          const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({
              event_name: eventName,
              user_id: data.user_id,
              date: eventDate,
              time_start: startTime24,
              time_end: endTime24,
              location: eventLocation
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            console.log('Event submitted successfully');
          } else {
            throw new Error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.log('Please fill out all fields');
      }
    } else {
      console.log("Unauthorized:", data.message);
    }
  } catch (error) {
    console.error(error);
  }

  modal.style.display = "none";
  body.style.overflow = "auto"; 
}




// close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    body.style.overflow = "auto"; 
  }
}

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




