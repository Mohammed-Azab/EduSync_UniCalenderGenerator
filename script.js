document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generateBtn").addEventListener("click", generateSchedule);
});

function generateSchedule() {
    console.log("Button clicked! Function is running.");

    let courseName = document.getElementById("courseName").value.trim();
    let courseCode = document.getElementById("courseCode").value.trim() || "N/A";
    let instructorName = document.getElementById("instructorName").value.trim() || "N/A";
    let location = document.getElementById("location").value.trim() || "N/A";
    let sessionType = document.getElementById("sessionType").value;
    let slot = parseInt(document.getElementById("slot").value);
    let weekDay = parseInt(document.getElementById("weekDay").value);
    let numWeeks = parseInt(document.getElementById("numWeeks").value);
    let repetitionType = document.getElementById("repetitionType").value;

    if (!courseName || isNaN(slot) || isNaN(numWeeks) || numWeeks < 1) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    let slotTimes = {
        1: "08:30 - 10:00",
        2: "10:30 - 12:00",
        3: "12:15 - 13:45",
        4: "14:15 - 15:45",
        5: "16:00 - 17:30",
    };

    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let schedule = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Mohammed Abdelazim//Uni Schedule//EN\n`;

    let currentDate = new Date();
    let dayDifference = (weekDay - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + dayDifference);

    for (let i = 0; i < numWeeks; i++) {
        let weekOffset = i * (repetitionType === "weekly" ? 7 : 14);
        let eventDate = new Date(currentDate);
        eventDate.setDate(eventDate.getDate() + weekOffset);

        let formattedDate = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        schedule += `BEGIN:VEVENT\nSUMMARY:${courseName} (${sessionType})\nLOCATION:${location}\n`;
        schedule += `DTSTART:${formattedDate}\nDTEND:${formattedDate}\nDESCRIPTION:Instructor: ${instructorName}, Course Code: ${courseCode}\nEND:VEVENT\n`;
    }
    schedule += "END:VCALENDAR";

    let file = new Blob([schedule], { type: "text/calendar" });
    let fileURL = URL.createObjectURL(file);
    let filename = `${courseName.replace(/\s+/g, "_")}_Schedule.ics`;

    let link = document.createElement("a");
    link.href = fileURL;
    link.download = filename;
    link.textContent = filename;

    let listItem = document.createElement("li");
    listItem.appendChild(link);
    document.getElementById("fileList").appendChild(listItem);

    console.log("Schedule generated successfully.");
}
