document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const viewMonthBtn = document.getElementById('view-month');
    const viewWeekBtn = document.getElementById('view-week');
    const viewDayBtn = document.getElementById('view-day');
    const eventDetails = document.getElementById('event-details');
    let currentDate = new Date();
    let currentView = 'month';  // Default view is monthly

    // Function to render the calendar for the given view
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        calendarBody.innerHTML = '';

        // Switch rendering logic based on the current view
        if (currentView === 'month') {
            renderMonthView(firstDayOfMonth, daysInMonth);
        } else if (currentView === 'week') {
            renderWeekView();
        } else if (currentView === 'day') {
            renderDayView();
        }
    }

    // Render monthly view
    function renderMonthView(firstDayOfMonth, daysInMonth) {
        let dateCell = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDayOfMonth) {
                    cell.classList.add('empty');
                } else if (dateCell > daysInMonth) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = dateCell;
                    cell.addEventListener('click', () => showEventDetails(dateCell));
                    dateCell++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    // Render weekly view
    function renderWeekView() {
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // End of the week (Saturday)

        calendarBody.innerHTML = ''; // Clear the current calendar

        const row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            const currentDay = new Date(firstDayOfWeek);
            currentDay.setDate(firstDayOfWeek.getDate() + i);
            cell.textContent = currentDay.getDate();
            cell.addEventListener('click', () => showEventDetails(currentDay));
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }

    // Render daily view
    function renderDayView() {
        const today = currentDate.getDate();
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 7;
        // cell.textContent = `Events for ${today}`;
        row.appendChild(cell);
        calendarBody.appendChild(row);
        showEventDetails(today); // Show event details for the current day
    }

    // Show event details for the selected day
    function showEventDetails(day) {
        //eventDetails.innerHTML = `<h3>Events for Day ${day}</h3>`;
        // Example event details (this could be dynamic based on your data)
        //eventDetails.innerHTML += `<p>Event: Example event for day ${day}</p>`;
    }

    // Event listeners for changing views
    viewMonthBtn.addEventListener('click', () => {
        currentView = 'month';
        renderCalendar(currentDate);
    });
    viewWeekBtn.addEventListener('click', () => {
        currentView = 'week';
        renderCalendar(currentDate);
    });
    viewDayBtn.addEventListener('click', () => {
        currentView = 'day';
        renderCalendar(currentDate);
    });

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Initial render
    renderCalendar(currentDate);
});

document.addEventListener('DOMContentLoaded', function() {
    const cycleLengthInput = document.getElementById('cycle-length');
    const periodLengthInput = document.getElementById('period-length');
    const lastPeriodStartInput = document.getElementById('last-period-start');
    const phaseIndicatorText = document.getElementById('phase-name');
    const buildButton = document.getElementById('build-button');
    
    // Function to calculate the current phase
    function calculatePhase() {
        const cycleLength = parseInt(cycleLengthInput.value, 10);
        const periodLength = parseInt(periodLengthInput.value, 10);
        const lastPeriodStart = new Date(lastPeriodStartInput.value);
        const currentDate = new Date();
        
        // Simple calculation for the phase
        const daysInCycle = cycleLength;
        const daysInPeriod = periodLength;

        const daysSinceLastPeriod = Math.floor((currentDate - lastPeriodStart) / (1000 * 60 * 60 * 24)); // days since last period

        let phase = '';

        if (daysSinceLastPeriod <= daysInPeriod) {
            phase = 'Menstruation';
        } else if (daysSinceLastPeriod <= daysInPeriod + Math.floor(daysInCycle / 4)) {
            phase = 'Follicular';
        } else if (daysSinceLastPeriod <= daysInPeriod + 2 * Math.floor(daysInCycle / 4)) {
            phase = 'Ovulation';
        } else {
            phase = 'Luteal';
        }

        phaseIndicatorText.textContent = phase; // Update the text in the phase-indicator
    }

    // Event listener to trigger calculation when "Build my schedule" button is clicked
    buildButton.addEventListener('click', function() {
        calculatePhase();
    });
});
