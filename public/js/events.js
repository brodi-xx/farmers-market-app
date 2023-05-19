let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    fullScreenControl: false,
  });

  // Get user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Set the center of the map to the user's location
        map.setCenter(userLocation);

        // Create a marker at the user's location (optional)
        const marker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
        });

        // Call the updateEvents function
        updateEvents();
      },
      function (error) {
        console.error("Error getting user's location: ", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  };
}

function updateEvents() {
  fetch('/api/events')
    .then(response => response.json())
    .then(data => {
      // For each event, create a marker
      data.forEach(event => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: event.event_location }, (results, status) => {
          if (status === 'OK') {
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,  // Now it can access 'map' variable
              title: event.event_name,
            });
          } else {
            console.error('Geocode was not successful for the following reason: ' + status);
          }
        });
      });
    })
    .catch(error => console.error('Error:', error));
}

window.onload = initMap;
