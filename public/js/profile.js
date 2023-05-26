// get modal
const modal = document.getElementById('eventModal')

// get button that opens the modal
const btn = document.getElementById('createEvent')

// get the button that submits the form
const submitBtn = document.getElementById('submitEvent')

// get the 'body' element (we'll use this to prevent scrolling when the modal is open)
const body = document.getElementsByTagName('body')[0]

// open the modal
btn.onclick = function () {
  modal.style.display = 'block'
  body.style.overflow = 'hidden'
}

function convert12hrTo24hr (time12hr) {
  const [time, modifier] = time12hr.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours}:${minutes}`
}

submitBtn.onclick = async function (event) {
  event.preventDefault() // prevent form from submitting and refreshing the page

  // Fetch the user_id from the current session
  try {
    const response = await fetch('/api/session')
    const data = await response.json()

    if (data.user_id) {
      const eventName = document.getElementById('eventName').value
      const eventDate = document.getElementById('eventDate').value
      const startTime = document.getElementById('startTime').value
      const endTime = document.getElementById('endTime').value
      const eventLocation = document.getElementById('eventLocation').value

      const startTime24 = convert12hrTo24hr(startTime)
      const endTime24 = convert12hrTo24hr(endTime)

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
            headers: { 'Content-Type': 'application/json' }
          })

          if (response.ok) {
            console.log('Event submitted successfully')
          } else {
            throw new Error('Error:', response.statusText)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      } else {
        console.log('Please fill out all fields')
      }
    } else {
      console.log('Unauthorized:', data.message)
    }
  } catch (error) {
    console.error(error)
  }

  modal.style.display = 'none'
  body.style.overflow = 'auto'
}

// close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
    body.style.overflow = 'auto'
  }
}

async function logout () {
  try {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('Success:', data)
      location.reload() // Refresh the page
    } else {
      throw new Error('Error:', response.statusText)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

document.querySelector('#logout').addEventListener('click', logout)
