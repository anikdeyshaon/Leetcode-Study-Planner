// --- Utility Functions ---
function getSpacedRepetitionDates(initialDate) {
    // Returns [date2, date3, date4, date5] as ISO strings
    const intervals = [3, 7, 14, 30]; // days after initial
    const base = new Date(initialDate);
    return intervals.map(days => {
        const d = new Date(base);
        d.setDate(d.getDate() + days);
        return d.toISOString().slice(0, 10);
    });
}

function showNotification(message, isError = false) {
    let bar = document.getElementById('notification-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'notification-bar';
        document.body.appendChild(bar);
    }
    bar.textContent = message;
    bar.className = isError ? 'notification error' : 'notification success';
    bar.style.display = 'block';
    setTimeout(() => { bar.style.display = 'none'; }, 2500);
}

function setLoading(isLoading) {
    const btn = document.getElementById('save-problem-btn');
    if (btn) btn.disabled = isLoading;
    const addBtn = document.getElementById('show-add-form-btn');
    if (addBtn) addBtn.disabled = isLoading;
}

// --- Modal Logic ---
const modal = document.getElementById('problem-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const showAddBtn = document.getElementById('show-add-form-btn');
const form = document.getElementById('problem-form');
let editMode = false;
let editId = null;

function openModal(edit = false, problem = null) {
    form.reset();
    editMode = edit;
    editId = edit && problem ? problem.id : null;
    if (edit && problem) {
        form['problem-name'].value = problem.name;
        form['problem-url'].value = problem.url;
        form['initial-solve-date'].value = problem.date1 ? problem.date1.slice(0, 10) : '';
        form['difficulty'].value = problem.difficulty || 'Normal';
    }
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
    editMode = false;
    editId = null;
}
closeModalBtn.onclick = closeModal;
cancelBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target === modal) closeModal();
};
showAddBtn.onclick = () => openModal(false);

// --- Fetch and Render Problems ---
const API_BASE = 'http://localhost:5214/api/problems'; // Change port if needed
const tableBody = document.querySelector('#problems-table tbody');

async function fetchProblems() {
    try {
        const res = await fetch(API_BASE);
        const problems = await res.json();
        renderProblems(problems);
    } catch (e) {
        showNotification('Failed to fetch problems', true);
    }
}

function renderProblems(problems) {
    tableBody.innerHTML = '';
    problems.forEach(problem => {
        const tr = document.createElement('tr');
        tr.className =
            problem.difficulty === 'Easy' ? 'problem-easy' :
            problem.difficulty === 'Hard' ? 'problem-hard' :
            'problem-normal';
        tr.setAttribute('data-id', problem.id);
        tr.innerHTML = `
            <td>${problem.name}</td>
            <td><a href="${problem.url}" target="_blank">Link</a></td>
            <td><span class="difficulty-dot ${tr.className}"></span> ${problem.difficulty || 'Normal'}</td>
            <td>${problem.date1 ? problem.date1.slice(0,10) : ''}</td>
            <td>${problem.date2 ? problem.date2.slice(0,10) : ''}</td>
            <td>${problem.date3 ? problem.date3.slice(0,10) : ''}</td>
            <td>${problem.date4 ? problem.date4.slice(0,10) : ''}</td>
            <td>${problem.date5 ? problem.date5.slice(0,10) : ''}</td>
            <td class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// --- Add/Edit Problem ---
form.onsubmit = async function(e) {
    e.preventDefault();
    setLoading(true);
    const name = form['problem-name'].value.trim();
    const url = form['problem-url'].value.trim();
    const date1 = form['initial-solve-date'].value;
    const difficulty = form['difficulty'].value;
    if (!name || !url || !date1 || !difficulty) {
        showNotification('All fields are required', true);
        setLoading(false);
        return;
    }
    let problem = { name, url, difficulty, date1 };
    // Spaced repetition logic
    const [date2, date3, date4, date5] = getSpacedRepetitionDates(date1);
    problem.date2 = date2;
    problem.date3 = date3;
    problem.date4 = date4;
    problem.date5 = date5;
    try {
        let res;
        if (editMode && editId) {
            problem.id = editId;
            res = await fetch(`${API_BASE}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(problem)
            });
        } else {
            res = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(problem)
            });
        }
        if (!res.ok) throw new Error('API error');
        showNotification(editMode ? 'Problem updated!' : 'Problem added!');
        closeModal();
        fetchProblems();
    } catch (e) {
        showNotification('Failed to save problem', true);
    } finally {
        setLoading(false);
    }
};

// --- Edit/Delete Handlers ---
tableBody.onclick = async function(e) {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const id = tr.getAttribute('data-id');
    if (e.target.classList.contains('edit')) {
        // Fetch single problem
        try {
            const res = await fetch(`${API_BASE}/${id}`);
            if (!res.ok) throw new Error();
            const problem = await res.json();
            openModal(true, problem);
        } catch {
            showNotification('Failed to load problem', true);
        }
    } else if (e.target.classList.contains('delete')) {
        if (!confirm('Delete this problem?')) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            showNotification('Problem deleted!');
            fetchProblems();
        } catch {
            showNotification('Failed to delete problem', true);
        } finally {
            setLoading(false);
        }
    }
};

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', fetchProblems);

// --- Notification Bar Styles ---
const style = document.createElement('style');
style.innerHTML = `
.notification {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 220px;
    max-width: 90vw;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 1rem;
    z-index: 2000;
    color: #fff;
    display: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.notification.success { background: #28a745; }
.notification.error { background: #dc3545; }
`;
document.head.appendChild(style); 