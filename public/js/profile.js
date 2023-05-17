
     // Define the data object with your profile information
    var data = {
      profilePicture: 'path/to/profile-picture.jpg',
      name: 'John Doe',
      location: 'New York City',
      email: 'john.doe@example.com',
      phone: '+1 123-456-7890'
    };
    // Compile the Handlebars template
    var templateSource = document.getElementById('profile-template').innerHTML;
    var template = Handlebars.compile(templateSource);
    // Render the template with the data
    var renderedHtml = template(data);
    // Insert the rendered HTML into the document
    document.body.innerHTML += renderedHtml;
