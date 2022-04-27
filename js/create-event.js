const formSelector = document.querySelector('#form');
console.log(formSelector);

formSelector.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formSelector);

    const attractionsArray = formObject.get('attractions-input').split(', ');

    const body = { 
        "name": formObject.get('name-input') ,
        "poster": "N/D",
        "attractions": attractionsArray ,
        "description": formObject.get('description-input') ,
        "scheduled": formObject.get('date-input') ,
        "number_tickets": formObject.get('capacity-input') ,
    }    

    fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(body)
    }).then((response)=>console.log(response)
    ).then(()=>{
        alert("Seu evento foi criado com sucesso");

        setTimeout(function () {
            window.location.href = '/admin.html';
        }, 1000);
    }
    ).catch((error)=>console.error(error));

})







// const formSelector = document.querySelector('#form')
// console.log(formSelector);

// formSelector.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formObject = new FormData(formSelector);

    
//     const attractionsArray = formObject.get('attractions-input').split(',');
    
//     const capacityNumber = Number(formObject.get('capacity-input'));
  
//     const body = {
//         "name": formObject.get('name-input'),
//         "poster": "N/D",
//         "attractions": attractionsArray,
//         "description": formObject.get('description-input'),
//         "scheduled": formObject.get('date-input'),
//         "number_tickets": capacityNumber
//     }

//     fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
//         "method": "POST",
//         "headers": { "content-type": "application/json" },
//         "body": JSON.stringify(body)
//     }).then( response => console.log(response) ).catch( error => console.error(error) );

// });

