document.addEventListener('DOMContentLoaded', function() {
    let cardContainer = document.querySelector('.project-card');
    let mainContainer = document.querySelector('.main-container');

    let cardData = [];

    function fetchData() {
        return fetch('https://github.com/afnan-hmd/Admin-Dashboard/blob/main/assets/data/cardInfo.json')
        .then(res => {
            if(!res.ok) {
                throw new Error('fetch response error')
            }
            return res.json();
        })
        .then(data => data.projects)
        .catch(error => {
            console.error('error fetching JSON data: ', error);
            return[];
        })
    }

    function createCard(data) {
        const card = document.createElement('div');
        card.setAttribute('data-id', data.id);
        card.classList.add('project-card');
        card.innerHTML = `
            <p class="project-title">${data.title}</p>
            <p class="project-description">
                ${data.description}
            </p>
            <ul class="project-action-btns">
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-eye"></i></li>
                <li><i class="fa fa-code-fork"></i></li>
            </ul>
        `;
        return card;
    }
    
    function updateCards() {
        mainContainer.innerHTML = '';
        for (let i=0; i < cardData.length; i++) {
            let card = createCard(cardData[i]);
            mainContainer.appendChild(card);
        }
    }

    fetchData().then(data => {
        cardData = data;
        updateCards();
    });

})