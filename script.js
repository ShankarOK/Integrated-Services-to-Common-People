document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        institutions: 'modalInstitutions',
        hospitals: 'modalHospitals',
        transportation: 'modalTransportation',
        textbooks: 'modalTextbooks',
        ebooks: 'modalEbooks',
        courses: 'modalCourses',
        apps: 'modalApps',
        admission: 'modalAdmission',
        fees: 'modalFees',
        contacts: 'modalContacts',
        'second-hand-books': 'modalSecondHandBooks',
        'reused-equipment': 'modalReusedEquipment',
        subjects: 'modalSubjects',
        teachers: 'modalTeachers',
        'tuition-contacts': 'modalTuitionContacts',
        programs: 'modalPrograms',
        activities: 'modalActivities',
        registration: 'modalRegistration',
        'training-programs': 'modalTrainingPrograms',
        'job-assistance': 'modalJobAssistance',
        workshops: 'modalWorkshops'
    };

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayCourses(data.courses);
            displayResources(data.resources);
            displayTutors(data.tutors);
        });

    document.getElementById('tutor-search').addEventListener('input', filterTutors);

    // Event listener for clicking on cards to show modals
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const type = card.id;
            if (modals[type]) {
                fetchData(`/${type}`, `modal${type.charAt(0).toUpperCase() + type.slice(1)}List`);
                const modal = document.getElementById(modals[type]);
                modal.style.display = 'block';
            }
        });
    });

    // Event listener for closing modals
    document.querySelectorAll('.close').forEach(span => {
        span.addEventListener('click', () => {
            const modalId = span.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'none';
        });
    });

    // Event listener to close modal when clicking outside it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    function displayCourses(courses) {
        const coursesList = document.getElementById('courses-list');
        if (coursesList) {
            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'card';
                courseCard.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
                coursesList.appendChild(courseCard);
            });
        }
    }

    function displayResources(resources) {
        const resourcesList = document.getElementById('resources-list');
        if (resourcesList) {
            resources.forEach(resource => {
                const resourceCard = document.createElement('div');
                resourceCard.className = 'card';
                resourceCard.innerHTML = `<h3>${resource.title}</h3><p>${resource.description}</p>`;
                resourcesList.appendChild(resourceCard);
            });
        }
    }

    function displayTutors(tutors) {
        const tutorsList = document.getElementById('tutors-list');
        if (tutorsList) {
            tutors.forEach(tutor => {
                const tutorCard = document.createElement('div');
                tutorCard.className = 'card';
                tutorCard.innerHTML = `<h3>${tutor.name}</h3><p>${tutor.subject}</p>`;
                tutorsList.appendChild(tutorCard);
            });
        }
    }

    function filterTutors(event) {
        const searchTerm = event.target.value.toLowerCase();
        const tutorCards = document.querySelectorAll('#tutors-list .card');
        tutorCards.forEach(card => {
            const tutorName = card.querySelector('h3').textContent.toLowerCase();
            if (tutorName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to fetch data from server and populate modal list
    function fetchData(url, listId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const list = document.querySelector(`#${listId}`);
                list.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.name} - ${item.address}${item.status ? ` (${item.status})` : ''}`;
                    list.appendChild(li);
                });
            })
            .catch(error => console.error(`Error fetching data from ${url}:`, error));
    }

    // Additional logic for specific pages (institutions.html, hospitals.html, transportation.html)
    const path = window.location.pathname;
    if (path === '/institutions.html') {
        fetchData('/api/institutions', 'modalInstitutionsList');
    } else if (path === '/hospitals.html') {
        fetchData('/api/hospitals', 'modalHospitalsList');
    } else if (path === '/transportation.html') {
        fetchData('/api/transportation', 'modalTransportationList');
    } else if (path === '/education.html') {
        fetchData('/api/education', 'modalEducationList');
    } // Add more conditions as needed for other specific pages
});
