let currentDate = new Date();

let selectedDate = null;

let memos = {};

const calendarContainer = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const memoContainer = document.getElementById('memo-container');
const memoDate = document.getElementById('memo-date');
const memoText = document.getElementById('memo-text');
const saveMemo = document.getElementById('save-memo');
const closeMemo = document.getElementById('close-memo');

function loadMemos() {
  try {
    const storedMemos = localStorage.getItem('memos');
    memos = storedMemos ? JSON.parse(storedMemos) : {};
  } catch (error) {
    console.error('Failed to load memos from localStorage:', error);
    memos = {};
  }
}

function saveMemos() {
  try {
    localStorage.setItem('memos', JSON.stringify(memos));
  } catch (error) {
    console.error('Failed to save memos to localStorage:', error);
    alert('메모를 저장하는 데 문제가 발생했습니다. 브라우저 설정을 확인해주세요.');
  }
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDisplayDate(year, month, day) {
  return `${year}년 ${month + 1}월 ${day}일`;
}

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = formatDisplayDate(year, month, 1).slice(0, -3);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  calendarContainer.innerHTML = '';

  for (let i = 0; i < firstDay.getDay(); i++) {
    calendarContainer.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    dayElement.classList.add('calendar-day');
    dayElement.setAttribute('role', 'gridcell');
    dayElement.setAttribute('tabindex', '0');

    const dateString = formatDate(year, month, day);
    if (memos[dateString]) {
      dayElement.classList.add('has-memo');
      dayElement.setAttribute('aria-label', `${day}일, 메모 있음`);
    } else {
      dayElement.setAttribute('aria-label', `${day}일`);
    }

    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      dayElement.classList.add('today');
    }

    if (
      selectedDate &&
      year === selectedDate.getFullYear() &&
      month === selectedDate.getMonth() &&
      day === selectedDate.getDate()
    ) {
      dayElement.classList.add('selected');
    }

    dayElement.addEventListener('click', () => {
      selectDate(year, month, day);
      openMemo(year, month, day);
    });

    dayElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        selectDate(year, month, day);
        openMemo(year, month, day);
      }
    });

    calendarContainer.appendChild(dayElement);
  }
}

function selectDate(year, month, day) {
  selectedDate = new Date(year, month, day);
  updateCalendar();
}

function openMemo(year, month, day) {
  const dateString = formatDate(year, month, day);
  memoDate.textContent = formatDisplayDate(year, month, day);
  memoText.value = memos[dateString] || '';
  memoContainer.style.display = 'block';
  memoText.focus();
}

function displayWeekdays() {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekdaysContainer = document.getElementById('weekdays');
  weekdaysContainer.innerHTML = '';
  weekdays.forEach((day) => {
    const dayElement = document.createElement('div');
    dayElement.textContent = day;
    weekdaysContainer.appendChild(dayElement);
  });
}

function init() {
  loadMemos();
  displayWeekdays();
  updateCalendar();

  prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });

  saveMemo.addEventListener('click', () => {
    const dateString = formatDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      parseInt(memoDate.textContent.split(' ')[2])
    );
    memos[dateString] = memoText.value;
    saveMemos();
    memoContainer.style.display = 'none';
    updateCalendar();
  });

  closeMemo.addEventListener('click', () => {
    memoContainer.style.display = 'none';
    selectedDate = null;
    updateCalendar();
  });
}

init();
