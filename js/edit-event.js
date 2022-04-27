const arrowGetEventById = async () => {
  try {
    const queryParameter = new URLSearchParams(window.location.search);

    const response = await fetch(
      "https://xp41-soundgarden-api.herokuapp.com/events/" +
        queryParameter.get("id")
    );

    const data = await response.json();

    return data;
  } catch {
    (error) => console.error(error);
  }
};

function placeInputByEvent(event) {
  const nameSelector = document.querySelector("#name-input");
  nameSelector.value = event.name;

  const bannerSelector = document.querySelector("#banner-input");
  bannerSelector.value = event.poster;

  const attractionsSelector = document.querySelector("#attractions-input");
  attractionsSelector.value = event.attractions.join(", ");

  const descriptionSelector = document.querySelector("#description-input");
  descriptionSelector.value = event.description;

  const dateSelector = document.querySelector("#date-input");
  dateSelector.value = event.scheduled.substring(0, 16);

  const capacityInput = document.querySelector("#capacity-input");
  capacityInput.value = event.number_tickets;
}

function placeInputOnObject(){
  const nameSelector = document.querySelector("#name-input");
  const bannerSelector = document.querySelector("#banner-input");
  const attractionsSelector = document.querySelector("#attractions-input");
  const descriptionSelector = document.querySelector("#description-input");
  const dateSelector = document.querySelector("#date-input");
  const capacityInput = document.querySelector("#capacity-input");

  return {
    "name": nameSelector.value,
    "attractions": attractionsSelector.value.split(', '),
    "poster": bannerSelector.value,
    "description": descriptionSelector.value,
    "scheduled": dateSelector.value,
    "number_tickets": capacityInput.value
  };

}

async function main() {
  try {
    const queryParameter = new URLSearchParams(window.location.search);
    const event = await arrowGetEventById();

    placeInputByEvent(event);
   
    const formSelector = document.querySelector("#form");

    formSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      const body =  placeInputOnObject();
      fetch(("https://xp41-soundgarden-api.herokuapp.com/events/" +
      queryParameter.get("id")), {"method": "PUT", "headers": {"content-type": "application/json"}, 
      "body": JSON.stringify(body)
    }).then(response => {
      console.log(response);
      alert("Seu evento foi atualizado!")
      }).catch(error => {console.error(error)})

    })

  } catch {
    (error) => console.error(error);
  }
}

main();

// const formSelector = document.querySelector('#form');
// const nameSelector = document.querySelector('#name-input');
// const bannerSelector = document.querySelector('#banner-input');
// const attractionsSelector = document.querySelector('#attractions-input');
// const descriptionSelector = document.querySelector('#description-input');
// const dateSelector = document.querySelector('#date-input');
// const capacitySelector = document.querySelector('#capacity-input');

// const querySelector = new URLSearchParams(window.location.search);

// function placeInputValuesFromEvent(data){
//   nameSelector.value = data.name;
//   bannerSelector.value = data.poster;
//   attractionsSelector.value = data.attractions.join(', ');
//   descriptionSelector.value = data.description;
//   dateSelector.value = data.scheduled.substring(0,16);
//   capacitySelector.value = data.number_tickets;
// }

// formSelector.addEventListener('submit', event => {
//   event.preventDefault();

//   const body = {
//     "name": nameSelector.value,
//     "attractions": attractionsSelector.value.split(', '),
//     "poster": bannerSelector.value,
//     "description": descriptionSelector.value,
//     "scheduled": dateSelector.value,
//     "number_tickets": capacitySelector.value
//   }

//   fetch('https://xp41-soundgarden-api.herokuapp.com/events/'+ querySelector.get('id'),
//   {"method": "PUT",
//   "headers": { "content-type": "application/json" },
//   "body": JSON.stringify(body)
// }
//   ).then(response => console.log(response)).catch(error => console.error(error));

// });

// fetch('https://xp41-soundgarden-api.herokuapp.com/events/' + querySelector.get('id'),
//   { "method": "GET" }
// ).then(response => {return response.json()}
// ).then(data => placeInputValuesFromEvent(data)
// ).catch(error => console.error(error));

// const queryParameter = new URLSearchParams(window.location.search);

// function placeInputValuesFromEvents(data){
//     nameSelector.value = data.name;
//     bannerSelector.value = data.poster;
//     attractionsSelector.value = data.attractions.join(', ');
//     descriptionSelector.value = data.description;
//     const date = data.scheduled.substring(0,16);
//     dateSelector.value = date;
//     capacitySelector.value = data.number_tickets;
// }

// formSelector.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formObject = new FormData(formSelector);
//     const attractionsArray = formObject.get('attractions-input').split(',');
//     const attractionsArrayTrimmed = attractionsArray.map( (attraction) => {return attraction.trim()} );

//     const numberTickets = Number(formObject.get('capacity-input'));

//     const body = {
//         "name": formObject.get('name-input'),
//         "poster": formObject.get('banner-input'),
//         "attractions": attractionsArrayTrimmed,
//         "description": formObject.get('description-input'),
//         "scheduled": formObject.get('date-input'),
//         "number_tickets": numberTickets
//     }

//     fetch("https://xp41-soundgarden-api.herokuapp.com/events/"+queryParameter.get('id'),
//         {"method": "PUT",
//          "headers": {"content-type": "application/json"},
//          "body": JSON.stringify(body)
//         })
//         .then(response => console.log(response)).catch(error => console.log(error));

// });

// fetch("https://xp41-soundgarden-api.herokuapp.com/events/"+queryParameter.get('id'), {
//   "method": "GET",
//   "headers": {}
// })
// .then(response => {
//   console.log(response);
//   return response.json();
// }).then(data => {
//     console.log(data);
//     placeInputValuesFromEvents(data);
// })
// .catch(err => {
//   console.error(err);
// });
