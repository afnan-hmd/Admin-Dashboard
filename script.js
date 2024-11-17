document.addEventListener('DOMContentLoaded', function() {
    let mainContainer = document.querySelector('.main-container');
    let announcementContainer = document.querySelector('.announcements');


    let cardData = [];
    let announcementData = [];

    function fetchCardData() {
        return fetch('https://raw.githubusercontent.com/afnan-hmd/Admin-Dashboard/main/assets/data/cardInfo.json')
        .then(res => {
            if(!res.ok) {
                throw new Error('card - fetch response error')
            }
            return res.json();
        })
        .then(data => data.projects)
        .catch(error => {
            console.error('error fetching card JSON data: ', error);
            return[];
        })
    }

    function fetchAnnouncementData() {
        return fetch('https://raw.githubusercontent.com/afnan-hmd/Admin-Dashboard/main/assets/data/announcementsInfo.json')
        .then(res => {
            if(!res.ok) {
                throw new Error('announecement - fetch response error')
            }
            return res.json();
        })
        .then(data => data.announcements)
        .catch(error => {
            console.error('error fetching announecement JSON data: ', error);
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

    function createAnnouncement(data) {
        const announcement = document.createElement('div');
        announcement.classList.add('announcement');
        announcement.innerHTML = `
            <p class="announcement-title">${data.title}</p>
            <p class="announcement-content">${data.content}</p>
        `;
        return announcement;
    }


    
    function updateCards() {
        mainContainer.innerHTML = '';
        for (let i=0; i < cardData.length; i++) {
            let card = createCard(cardData[i]);
            mainContainer.appendChild(card);
        }
    }

    function updateAnnouncement() {
        announcementContainer.innerHTML = '';
        for (let i=0; i < announcementData.length; i++) {
            let announcement = createAnnouncement(announcementData[i]);
            announcementContainer.appendChild(announcement);
        }
    }

    fetchCardData().then(data => {
        cardData = data;
        updateCards();
    });

    fetchAnnouncementData().then(data => {
        announcementData = data;
        updateAnnouncement();
    });


})