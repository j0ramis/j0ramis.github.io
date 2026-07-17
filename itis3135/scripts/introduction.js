    const form = document.getElementById("intro-form");
    const coursesContainer = document.getElementById("courses-container");
    const resultSection = document.getElementById("result-section");
    const outputSection = document.getElementById("code-output-section");

    const getValue = (id) => document.getElementById(id).value.trim();

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        }[character]));
    }

    function escapeXML(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&apos;"
        }[character]));
    }

    function getPictureName() {
        const pictureInput = document.getElementById("picture");

        if (pictureInput.files && pictureInput.files.length > 0) {
            return pictureInput.files[0].name;
        }

        return "No picture selected";
    }

    function collectCourses() {
        const courseEntries = document.querySelectorAll(".course-entry");
        const courses = [];

        courseEntries.forEach((entry) => {
            const department = entry.querySelector(".course-department").value.trim();
            const number = entry.querySelector(".course-number").value.trim();
            const name = entry.querySelector(".course-name").value.trim();
            const reason = entry.querySelector(".course-reason").value.trim();

            courses.push({
                department,
                number,
                name,
                reason
            });
        });

        return courses;
    }

    function collectLinks() {
        return [
            {
                name: getValue("link-one-name"),
                url: getValue("link-one-url")
            },
            {
                name: getValue("link-two-name"),
                url: getValue("link-two-url")
            },
            {
                name: getValue("link-three-name"),
                url: getValue("link-three-url")
            },
            {
                name: getValue("link-four-name"),
                url: getValue("link-four-url")
            },
            {
                name: getValue("link-five-name"),
                url: getValue("link-five-url")
            }
        ].filter((link) => link.name !== "" || link.url !== "");
    }

    function collectFormData() {
        return {
            firstName: getValue("first-name"),
            middleName: getValue("middle-name"),
            lastName: getValue("last-name"),
            nickname: getValue("nickname"),
            acknowledgment: getValue("acknowledgment"),
            acknowledgmentDate: getValue("acknowledgment-date"),
            mascotAdjective: getValue("mascot-adjective"),
            mascotAnimal: getValue("mascot-animal"),
            divider: getValue("divider"),
            picture: getPictureName(),
            pictureCaption: getValue("picture-caption"),
            personalStatement: getValue("personal-statement"),
            personalBackground: getValue("personal-background"),
            professionalBackground: getValue("professional-background"),
            academicBackground: getValue("academic-background"),
            subjectBackground: getValue("subject-background"),
            platform: getValue("platform"),
            courses: collectCourses(),
            quote: getValue("quote"),
            quoteAuthor: getValue("quote-author"),
            funnyThing: getValue("funny-thing"),
            share: getValue("share"),
            links: collectLinks()
        };
    }

    function getFullName(data) {
        return [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");
    }

    function getDisplayName(data) {
        return `${getFullName(data)} ${data.divider} ${data.nickname}`;
    }

    function buildCourseListHTML(courses) {
        return courses.map((course) => `
            <li>
                <strong>${escapeHTML(course.department)} ${escapeHTML(course.number)} - ${escapeHTML(course.name)}:</strong>
                ${escapeHTML(course.reason)}
            </li>`).join("");
    }

    function buildLinksHTML(links) {
        return links.map((link) => {
            if (link.url === "") {
                return escapeHTML(link.name);
            }

            return `<a href="${escapeHTML(link.url)}">${escapeHTML(link.name)}</a>`;
        }).join(" | ");
    }

    function buildIntroductionHTML(data) {
        return `<section>
    <h3>${escapeHTML(getDisplayName(data))}</h3>

    <p><em>${escapeHTML(data.acknowledgment)} - ${escapeHTML(data.acknowledgmentDate)}</em></p>

    <figure>
        <figcaption>${escapeHTML(data.pictureCaption)}</figcaption>
    </figure>

    <p>${escapeHTML(data.personalStatement)}</p>

    <ul>
        <li><strong>Personal Background:</strong> ${escapeHTML(data.personalBackground)}</li>
        <li><strong>Professional Background:</strong> ${escapeHTML(data.professionalBackground)}</li>
        <li><strong>Academic Background:</strong> ${escapeHTML(data.academicBackground)}</li>
        <li><strong>Background in this Subject:</strong> ${escapeHTML(data.subjectBackground)}</li>
        <li><strong>Primary Computer Platform:</strong> ${escapeHTML(data.platform)}</li>
        <li><strong>Courses I'm Taking &amp; Why:</strong>
            <ul>${buildCourseListHTML(data.courses)}
            </ul>
        </li>
        <li><strong>Funny/Interesting Item to Remember Me By:</strong> ${escapeHTML(data.funnyThing)}</li>
        <li><strong>I'd Also Like to Share:</strong> ${escapeHTML(data.share)}</li>
    </ul>

    <p class="quote">"${escapeHTML(data.quote)}"</p>
    <p class="attribution">— ${escapeHTML(data.quoteAuthor)}</p>

    <p>${buildLinksHTML(data.links)}</p>
</section>`;
    }

    function buildJSON(data) {
        return JSON.stringify(data, null, 4);
    }

    function buildXML(data) {
        const courseXML = data.courses.map((course) => `        <course>
            <department>${escapeXML(course.department)}</department>
            <number>${escapeXML(course.number)}</number>
            <name>${escapeXML(course.name)}</name>
            <reason>${escapeXML(course.reason)}</reason>
        </course>`).join("\n");

        const linkXML = data.links.map((link) => `        <link>
            <name>${escapeXML(link.name)}</name>
            <url>${escapeXML(link.url)}</url>
        </link>`).join("\n");

        return `<?xml version="1.0" encoding="UTF-8"?>
<introduction>
    <name>
        <first>${escapeXML(data.firstName)}</first>
        <middle>${escapeXML(data.middleName)}</middle>
        <last>${escapeXML(data.lastName)}</last>
        <nickname>${escapeXML(data.nickname)}</nickname>
    </name>
    <acknowledgment>${escapeXML(data.acknowledgment)}</acknowledgment>
    <acknowledgmentDate>${escapeXML(data.acknowledgmentDate)}</acknowledgmentDate>
    <mascot>
        <adjective>${escapeXML(data.mascotAdjective)}</adjective>
        <animal>${escapeXML(data.mascotAnimal)}</animal>
    </mascot>
    <divider>${escapeXML(data.divider)}</divider>
    <picture>${escapeXML(data.picture)}</picture>
    <pictureCaption>${escapeXML(data.pictureCaption)}</pictureCaption>
    <personalStatement>${escapeXML(data.personalStatement)}</personalStatement>
    <personalBackground>${escapeXML(data.personalBackground)}</personalBackground>
    <professionalBackground>${escapeXML(data.professionalBackground)}</professionalBackground>
    <academicBackground>${escapeXML(data.academicBackground)}</academicBackground>
    <subjectBackground>${escapeXML(data.subjectBackground)}</subjectBackground>
    <platform>${escapeXML(data.platform)}</platform>
    <courses>
${courseXML}
    </courses>
    <quote>${escapeXML(data.quote)}</quote>
    <quoteAuthor>${escapeXML(data.quoteAuthor)}</quoteAuthor>
    <funnyThing>${escapeXML(data.funnyThing)}</funnyThing>
    <share>${escapeXML(data.share)}</share>
    <links>
${linkXML}
    </links>
</introduction>`;
    }

    function showCodeOutput(label, content) {
        let outputArticle = document.getElementById("generated-code-output");

        if (!outputArticle) {
            outputArticle = document.createElement("article");
            outputArticle.id = "generated-code-output";
            outputSection.appendChild(outputArticle);
        }

        outputArticle.innerHTML = "";

        const heading = document.createElement("h4");
        heading.textContent = label;

        const textArea = document.createElement("textarea");
        textArea.value = content;
        textArea.rows = 24;
        textArea.cols = 80;
        textArea.readOnly = true;

        outputArticle.appendChild(heading);
        outputArticle.appendChild(textArea);
    }

    function renderIntroduction(event) {
        event.preventDefault();
        const data = collectFormData();
        resultSection.innerHTML = buildIntroductionHTML(data);
    }

    function addCourse() {
        const courseEntry = document.createElement("div");
        courseEntry.className = "course-entry";

        courseEntry.innerHTML = `
            <label>Department:</label>
            <input type="text" class="course-department" placeholder="Example: ITIS" required>

            <label>Course Number:</label>
            <input type="text" class="course-number" placeholder="Example: 3135" required>

            <label>Course Name:</label>
            <input type="text" class="course-name" placeholder="Course name" required>

            <label>Reason for Taking:</label>
            <input type="text" class="course-reason" placeholder="Reason for taking this course" required>

            <button type="button" class="delete-course">Delete Course</button>
        `;

        coursesContainer.appendChild(courseEntry);
    }

    function deleteCourse(event) {
        if (event.target.classList.contains("delete-course")) {
            event.target.parentElement.remove();
        }
    }

    function clearForm() {
        // Select all inputs and textareas inside the form to wipe them blank
        const inputs = form.querySelectorAll("input, textarea");
        
        inputs.forEach((element) => {
            // Clear file inputs safely
            if (element.type === "file") {
                element.value = ""; 
            } 
            // Wipes text, URLs, and textareas, but bypasses the buttons themselves
            else if (element.type !== "button" && element.type !== "submit" && element.type !== "reset") {
                element.value = "";
            }
        });
    }
    
    form.addEventListener("submit", renderIntroduction);
    document.getElementById("add-course").addEventListener("click", addCourse);
    document.getElementById("clear-form").addEventListener("click", clearForm);
    coursesContainer.addEventListener("click", deleteCourse);

    document.getElementById("generate-html").addEventListener("click", () => {
        showCodeOutput("Generated HTML", buildIntroductionHTML(collectFormData()));
    });

    document.getElementById("generate-json").addEventListener("click", () => {
        showCodeOutput("Generated JSON", buildJSON(collectFormData()));
    });

    document.getElementById("generate-xml").addEventListener("click", () => {
        showCodeOutput("Generated XML", buildXML(collectFormData()));
    });