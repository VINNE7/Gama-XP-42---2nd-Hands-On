
const eventsContainerSelector = document.querySelector('#events-container');

function onButtonClick(clickEvent) {
    const button = clickEvent.target;

    const modalLabelSelector = document.querySelector('#ModalLabel');

    modalLabelSelector.innerText = button.dataset.name;

    const reserveButton = document.querySelector('#reserveButton');

    reserveButton.setAttribute('data-id', button.dataset.id);

}

function createReserve(event){
    const nameSelector = document.querySelector('#name-input');

    const emailSelector = document.querySelector('#email-input');

    const body = {
        owner_name: nameSelector.value,
        owner_email: emailSelector.value,
        number_tickets: 1,
        event_id: event.target.dataset.id
    }

    console.log(JSON.stringify(body));

    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

}

function createElementFromEvent(data){
    data.forEach((event) => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('evento');
        articleElement.classList.add('card');
        articleElement.classList.add('p-5');
        articleElement.classList.add('m-3');


        const h2Element = document.createElement('h2');
        const eventName = event.name;
        const eventDate = event.scheduled.substring(0, 10).replaceAll('-', '/');
        h2Element.innerText = eventName + " - " + eventDate;

        const h4Element = document.createElement('h4');
        h4Element.innerText = event.attractions.join(', ');

        const pElement = document.createElement('p');
        pElement.innerText = event.description;

        const anchorButton = document.createElement('a');
        anchorButton.classList.add('btn');
        anchorButton.classList.add('btn-primary');
        anchorButton.innerText = 'reservar ingresso';
        anchorButton.classList.add('btn-toggle-modal')
        anchorButton.setAttribute('data-toggle', 'modal');
        anchorButton.setAttribute('data-target', '#exampleModal');
        anchorButton.setAttribute('data-id', event._id);
        anchorButton.setAttribute('data-name', event.name);
        anchorButton.addEventListener('click', (clickEvent) => onButtonClick(clickEvent) );

        articleElement.append(h2Element, h4Element, pElement, anchorButton);

        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'div-container');
        // divContainer.classList.add('col-sm');
        // divContainer.append(articleElement);

        eventsContainerSelector.append(articleElement);
    })
}

function setEventListenerOnModalButton(){
    const reserveButtonSelector = document.querySelector('#reserveButton');

    reserveButtonSelector.addEventListener('click', (event) => createReserve(event) );
}


const arrowGetEvents = async () => {
    try {
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events');
        // console.log(response);

        const data = await response.json();
        // console.log(data);
        return data;


    } catch (error) {
        console.error(error);
    }
}


async function main() {
    try {
        const data = await arrowGetEvents ();
        

        createElementFromEvent(data);

        setEventListenerOnModalButton();


    } catch (error) {
        console.error(error);
    }
}

main();