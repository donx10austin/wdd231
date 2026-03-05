const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Dev I', credits: 2, completed: false }
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

    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsDisplay.textContent = total;
}

document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'WDD')));

// Initial load
displayCourses(courses);

// Date logic for 2026
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;