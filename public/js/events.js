let map
let currentInfoWindow

function initMap () {
  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    fullScreenControl: false
  })

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        // Set the center of the map to the user's location
        map.setCenter(userLocation)

        // Create a marker at the user's location (optional)
        const marker = new google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location'
        })

        // Call the updateEvents function
        updateEvents()
      },
      function (error) {
        console.error("Error getting user's location: ", error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

function updateEvents () {
  fetch('/api/events')
    .then(response => response.json())
    .then(data => {
      // For each event, create a marker
      data.forEach(event => {
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: event.location }, (results, status) => {
          if (status === 'OK') {
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: event.event_name
            })

            // Convert the event time to 12-hour format
            const startTime = convertTo12HourFormat(event.time_start)
            const endTime = convertTo12HourFormat(event.time_end)

            // Define the content of the InfoWindow
            const infowindowContent = `
              <p>Host: ${event.user.name}</p>
              <p>Event: ${event.event_name}</p>
              <p>Location: ${event.location}</p>
              <p>Date: ${event.date}</p>
              <p>Start: ${startTime} Ends: ${endTime}</p>
            `

            // Create the InfoWindow
            const infowindow = new google.maps.InfoWindow({
              content: infowindowContent
            })

            // Add a click listener to the marker to open the InfoWindow
            marker.addListener('click', function () {
              // Close the currently open InfoWindow, if any
              if (currentInfoWindow) {
                currentInfoWindow.close()
              }
              // Open the clicked InfoWindow
              infowindow.open(map, marker)
              // Set the current InfoWindow as the opened one
              currentInfoWindow = infowindow
            })
          } else {
            console.error('Geocode was not successful for the following reason: ' + status)
          }
        })
      })
    })
    .catch(error => console.error('Error:', error))
}

function convertTo12HourFormat (time) {
  const parts = time.split(':')
  let hours = parseInt(parts[0])
  const minutes = parseInt(parts[1])

  let period = 'AM'
  if (hours >= 12) {
    period = 'PM'
    if (hours > 12) {
      hours -= 12
    }
  }
  if (hours === 0) {
    hours = 12
  }

  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`
}

window.onload = initMap
