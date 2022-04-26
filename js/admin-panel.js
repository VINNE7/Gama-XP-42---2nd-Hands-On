const tableBodySelector = document.querySelector('#table-body');

function createElementFromEvent(data){
    data.forEach( (event, index) => {
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.setAttribute('scope','row')
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.substring(0,10).replaceAll('-', '/');
        const time = event.scheduled.substring(11, 16)
        firstTdElement.innerText = date + " " + time;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;

        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');

        const fourthTdElement = document.createElement('td');

        const firstAnchor = document.createElement('a');
        firstAnchor.innerText = "ver reservas"
        firstAnchor.classList.add('btn')
        firstAnchor.classList.add('btn-dark')

        const secondAnchor = document.createElement('a');
        secondAnchor.innerText = "editar"
        secondAnchor.href = "editar-evento.html?id="+event._id;
        secondAnchor.classList.add('btn')
        secondAnchor.classList.add('btn-secondary')

        const thirdAnchor = document.createElement('a');
        thirdAnchor.innerText = "excluir"
        thirdAnchor.href = "excluir-evento.html?id="+event._id;
        thirdAnchor.classList.add('btn')
        thirdAnchor.classList.add('btn-danger')



        fourthTdElement.append(firstAnchor,secondAnchor,thirdAnchor);
        tableBodySelector.appendChild(trElement);
        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);


    } );
}

fetch("https://xp41-soundgarden-api.herokuapp.com/events", {"method": "GET"}
     ).then( response => {return response.json()}
     ).then( data => createElementFromEvent(data)  )
     .catch( error => console.log(error) );

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





