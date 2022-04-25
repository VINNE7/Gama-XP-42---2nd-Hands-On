const formSelector = document.querySelector('#form');

formSelector.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formSelector);

    const attractionsArray = formObject.get('attractions-input').split(',');
    
    const attractionsArrayTrimmed = attractionsArray.map( (attraction) => { return attraction.trim() } )

    const numberTickets = Number(formObject.get('capacity-input'))
    
    const body = { 
        "name": formObject.get('name-input'),
        "attractions": attractionsArrayTrimmed,
        "poster": "N/D",
        "description": formObject.get('description-input'),
        "scheduled": formObject.get('date-input'),
        "number_tickets": numberTickets
     }

     fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
         "method": "POST",
         "headers": { "Content-Type": "application/JSON" },
         "body": JSON.stringify(body)
     }).then( response => console.log(response)).catch( error => console.error(error));


});
