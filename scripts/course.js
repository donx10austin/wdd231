// Data Array
const courses = [
    { subject: 'CSE', number: 110, credits: 2, completed: true },
    { subject: 'WDD', number: 130, credits: 2, completed: true },
    { subject: 'CSE', number: 111, credits: 2, completed: true },
    { subject: 'CSE', number: 210, credits: 2, completed: false },
    { subject: 'WDD', number: 131, credits: 2, completed: true },
    { subject: 'WDD', number: 231, credits: 2, completed: false }
];

// Display Function
function displayCourses(filteredList) {
    const container = document.querySelector("#course-list");
    container.innerHTML = "";

    filteredList.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const total = filteredList.reduce((acc, course) => acc + course.credits, 0);
    document.querySelector("#total-credits").textContent = total;
}

// Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Event Listeners
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'WDD')));

// Initial Render
displayCourses(courses);