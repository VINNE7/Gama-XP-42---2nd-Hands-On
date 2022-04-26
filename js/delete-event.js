const formSelector = document.querySelector('#form');
const nameSelector = document.querySelector('#name-input');
const bannerSelector = document.querySelector('#banner-input');
const attractionsSelector = document.querySelector('#attractions-input');
const descriptionSelector = document.querySelector('#description-input');
const dateSelector = document.querySelector('#date-input');
const capacitySelector = document.querySelector('#capacity-input');

const queryParameter = new URLSearchParams(window.location.search);

function placeInputValuesFromEvents(data) {
    nameSelector.value = data.name;
    bannerSelector.value = data.poster;
    attractionsSelector.value = data.attractions.join(', ');
    descriptionSelector.value = data.description;
    const date = data.scheduled.substring(0, 16);
    dateSelector.value = date;
    capacitySelector.value = data.number_tickets;
}

formSelector.addEventListener('submit', event => {

    event.preventDefault();

    fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get('id'), {
        "method": "DELETE",
        "headers": {}
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
})


fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get('id'), {
    "method": "GET",
    "headers": {}
})
    .then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
        placeInputValuesFromEvents(data);
    })
    .catch(err => {
        console.error(err);
    });

















    // // setTimeout(function () {
    //     window.location.href = '/admin.html';
    // }, 1000);