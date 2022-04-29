const arrowGetEvents = async () => {
    try{
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error)
    }
}

const arrowGetReserves = async (eventId) => {
    const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/bookings/event/' + eventId);

    const data = await response.json();

    return data;
}

function deleteReserve(event){
    const reserveId = event.target.dataset.id;

    console.log(reserveId);

    fetch('https://xp41-soundgarden-api.herokuapp.com/bookings/' + reserveId, {method: "DELETE"}
    ).then(response => console.log(response)
    ).catch(error => console.error(error));
}

async function renderReserves(clickEvent){
    const secondTableBodySelector = document.querySelector('#secondTable-body');
    secondTableBodySelector.innerHTML = "";

    const buttonSelector = clickEvent.target;

    const reservesObject = await arrowGetReserves(clickEvent.target.dataset.id);

    const modalLabel = document.querySelector('#ModalLabel');
    modalLabel.innerText = clickEvent.target.dataset.name;

    reservesObject.forEach( (reserve, index) => {
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        firstTdElement.innerText = reserve.owner_name;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = reserve.owner_email;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = clickEvent.target.dataset.name;

        const fourthTdElement = document.createElement('td');

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Excluir";
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-danger');
        deleteButton.setAttribute('data-id', reserve._id)
        deleteButton.addEventListener('click', (event) => { deleteReserve(event) })

        fourthTdElement.appendChild(deleteButton)

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);
        secondTableBodySelector.append(trElement);

    });

}

const renderElements = (eventsArray) => {
    eventsArray.forEach( (event, index) => {

        const tableBodySelector = document.querySelector('#table-body')

        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.substring(0, 10).replaceAll('-', '/');
        const time = event.scheduled.substring(11, 16);
        firstTdElement.innerText = date + " " + time;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');

        const forthTdElement = document.createElement('td');

        const firstAnchorTag = document.createElement('a');
        firstAnchorTag.innerText = "Ver Reservas";
        firstAnchorTag.classList.add('btn');
        firstAnchorTag.classList.add('btn-dark');
        firstAnchorTag.setAttribute('data-toggle', 'modal');
        firstAnchorTag.setAttribute('data-target', '#exampleModal');
        firstAnchorTag.setAttribute('data-id', event._id);
        firstAnchorTag.setAttribute('data-name', event.name);
        firstAnchorTag.addEventListener('click', (clickEvent) => renderReserves(clickEvent) );


        const secondAnchorTag = document.createElement('a');
        secondAnchorTag.innerText = "Editar";
        secondAnchorTag.classList.add('btn');
        secondAnchorTag.classList.add('btn-secondary');
        secondAnchorTag.setAttribute('href', ('editar-evento.html?id=' + event._id));


        const thirdAnchorTag = document.createElement('a');
        thirdAnchorTag.innerText = "Excluir";
        thirdAnchorTag.classList.add('btn');
        thirdAnchorTag.classList.add('btn-danger');
        thirdAnchorTag.setAttribute('href', ('excluir-evento.html?id=' + event._id));

        forthTdElement.append(firstAnchorTag, secondAnchorTag, thirdAnchorTag);

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, forthTdElement);

        tableBodySelector.appendChild(trElement);

    } )
}

async function main() {
    try{
        const eventsArray = await arrowGetEvents();
        // console.log(eventsArray);
        renderElements(eventsArray);

    } catch (error) {
        console.error(error)
    }
}

main();






// const tableBodySelector = document.querySelector('#table-body');

// function createElementFromEvent(data) {
//     data.forEach((event, index) => {
//         const trElement = document.createElement('tr');

//         const thElement = document.createElement('th');
//         thElement.setAttribute('scope', 'row')
//         thElement.innerText = index + 1;

//         const firstTdElement = document.createElement('td');
//         const date = event.scheduled.substring(0, 10).replaceAll('-', '/');
//         const time = event.scheduled.substring(11, 16)
//         firstTdElement.innerText = date + " " + time;

//         const secondTdElement = document.createElement('td');
//         secondTdElement.innerText = event.name;

//         const thirdTdElement = document.createElement('td');
//         thirdTdElement.innerText = event.attractions.join(', ');

//         const fourthTdElement = document.createElement('td');

//         const firstAnchor = document.createElement('a');
//         firstAnchor.innerText = "ver reservas"
//         firstAnchor.classList.add('btn')
//         firstAnchor.classList.add('btn-dark')

//         const secondAnchor = document.createElement('a');
//         secondAnchor.innerText = "editar"
//         secondAnchor.href = "editar-evento.html?id=" + event._id;
//         secondAnchor.classList.add('btn')
//         secondAnchor.classList.add('btn-secondary')

//         const thirdAnchor = document.createElement('a');
//         thirdAnchor.innerText = "excluir"
//         thirdAnchor.href = "excluir-evento.html?id=" + event._id;
//         thirdAnchor.classList.add('btn')
//         thirdAnchor.classList.add('btn-danger')



//         fourthTdElement.append(firstAnchor, secondAnchor, thirdAnchor);
//         tableBodySelector.appendChild(trElement);
//         trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);


//     });
// }

// fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
//         "method": "GET"
//     }).then(response => {
//         return response.json()
//     }).then(data => createElementFromEvent(data))
//     .catch(error => console.log(error));

// const tableSelector = document.querySelector('.table');

// const tableBodySelector = tableSelector.childNodes[3];

// function createElementsFromEvents(data){
//     data.forEach((event, index) => {
//         const trElement = document.createElement('tr');

//         const thElement = document.createElement('th');
//         thElement.setAttribute('scope', 'row');
//         thElement.innerText = index + 1;

//         const firstTdElement = document.createElement('td');
//         const date = event.scheduled.substring(0,10);
//         const time = event.scheduled.substring(11,16);
//         firstTdElement.innerText = date.replaceAll('-', '/')+ " " + time;

//         const secondTdElement = document.createElement('td');
//         secondTdElement.innerText = event.name;

//         const thirdTdElement = document.createElement('td');
//         thirdTdElement.innerText = event.attractions.join(', ');

//         const fourthTdElement = document.createElement('td');

//         const firstAnchor = document.createElement('a');
//         firstAnchor.innerText = "ver reservas";
//         firstAnchor.classList.add('btn');
//         firstAnchor.classList.add('btn-dark');


//         const secondAnchor = document.createElement('a');
//         secondAnchor.innerText = "editar";
//         secondAnchor.classList.add('btn');
//         secondAnchor.classList.add('btn-secondary');
//         secondAnchor.href = 'editar-evento.html?id='+ event._id;

//         const thirdAnchor = document.createElement('a');
//         thirdAnchor.innerText = "excluir";
//         thirdAnchor.classList.add('btn');
//         thirdAnchor.classList.add('btn-danger');
//         thirdAnchor.href = 'excluir-evento.html?id='+ event._id;

//         fourthTdElement.append(firstAnchor, secondAnchor, thirdAnchor);


//         trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);
//         tableBodySelector.appendChild(trElement);

//      })
// }

// fetch('https://xp41-soundgarden-api.herokuapp.com/events', {"method": "GET"}
// ).then(response => response.json()).then(data => createElementsFromEvents(data)
// ).catch(error => console.log(error));