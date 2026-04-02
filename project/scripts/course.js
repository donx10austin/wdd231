const courses = [
    { subject: 'CSE', number: 110, title: 'Intro', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend', credits: 2, completed: false }
];

const courseList = document.querySelector("#course-list");
const totalCreditsDisplay = document.querySelector("#total-credits");

function displayCourses(filtered) {
    courseList.innerHTML = "";
    filtered.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(card);
    });
    totalCreditsDisplay.textContent = filtered.reduce((sum, c) => sum + c.credits, 0);
}

document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'WDD')));

displayCourses(courses);

// Year and Modification logic (2026)
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;