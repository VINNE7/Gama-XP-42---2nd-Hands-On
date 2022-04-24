const formSelector = document.querySelector('#form');

console.log(formSelector);
 
formSelector.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(formSelector);
    
    const values = [...formData.entries()];
    console.log(values);

    const attractionsArray = values[1][1].split(',');
    const attractionsArrayTrimmed = attractionsArray.map(attraction => attraction.trim() );
    
    console.log(attractionsArrayTrimmed);

    const body = { 
        name: values[0][1],
        poster: "https://i.imgur.com/fQHuZuv.png",
        attractions: attractionsArrayTrimmed,
        description: values[2][1],
        scheduled: values[3][1],
        number_tickets: parseInt(values[4][1])
    }

    console.log(body);

    fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

});

