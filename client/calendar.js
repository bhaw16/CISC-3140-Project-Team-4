document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var eventForm = document.getElementById('eventForm');
    var addEventButton = document.getElementById('addEventButton');
    var concertDateInput = document.getElementById('concert-date');
    var concertNameInput = document.getElementById('concert-name');

    // Initialize the calendar
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        dayMaxEvents: true,
        select: function(info) {
            // Show the form and set the date
            eventForm.removeAttribute('hidden');
            concertDateInput.value = info.startStr;
            concertDateInput.setAttribute('placeholder', info.startStr);
        },
        events: [
            {
                title: 'Concert A',
                start: '2024-08-20',
                end: '2024-08-22'
            },
            {
                title: 'Concert B',
                start: '2024-09-10T10:00:00',
                end: '2024-09-10T12:00:00'
            }
        ]
    });

    calendar.render();

    // Add Event Button functionality
    addEventButton.addEventListener('click', function() {
        // Show the form
        eventForm.removeAttribute('hidden');
    });

    // Handle form submission
    eventForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        var title = concertNameInput.value;
        var start = concertDateInput.value;

        if (title && start) {
            calendar.addEvent({
                title: title,
                start: start,
                allDay: true
            });

            // Hide the form and reset it
            eventForm.setAttribute('hidden', true);
            concertNameInput.value = '';
            concertDateInput.value = '';
        }
    });
});
