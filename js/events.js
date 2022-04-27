
const eventsContainerSelector = document.querySelector('#events-container');

function createElementFromEvent(data){
    data.forEach((event, index) => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('evento');
        articleElement.classList.add('card');
        articleElement.classList.add('p-5');
        articleElement.classList.add('m-3');


        const h2Element = document.createElement('h2');
        const eventName = event.name;
        const eventDate = event.scheduled.substring(0,10).replaceAll('-', '/');
        h2Element.innerText = eventName + " - " + eventDate;

        const h4Element = document.createElement('h4');
        h4Element.innerText = event.attractions.join(', ');

        const pElement = document.createElement('p');
        pElement.innerText = event.description;

        const anchorButton = document.createElement('a');
        anchorButton.classList.add('btn');
        anchorButton.classList.add('btn-primary');
        anchorButton.innerText = 'reservar ingresso';

        articleElement.append(h2Element, h4Element, pElement, anchorButton);

        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'div-container');
        // divContainer.classList.add('col-sm');
        // divContainer.append(articleElement);

        eventsContainerSelector.append(articleElement);
    })
}


fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "GET",
}).then(response => {return response.json()}
).then(data => createElementFromEvent(data)
).catch(error => console.log(error));