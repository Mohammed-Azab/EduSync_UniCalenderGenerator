document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded! Checking for button...");

    let button = document.getElementById("generateBtn");
    if (button) {
        console.log("Button found! Adding event listener.");
        button.addEventListener("click", generateSchedule);
    } else {
        console.error("Button not found!");
    }
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

    if (!courseName || isNaN(slot) || isNaN(numWeeks) || isNaN(weekDay)) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    if (!Number.isInteger(slot) || slot < 1 || slot > 5) {
        alert("Invalid Slot: Must be a positive integer between 1 and 5.");
        return;
    }

    if (!Number.isInteger(weekDay) || weekDay < 0 || weekDay > 6) {
        alert("Invalid Weekday: Must be between 0 (Sunday) and 6 (Saturday).");
        return;
    }

    if (!Number.isInteger(numWeeks) || numWeeks < 1) {
        alert("Invalid Number of Weeks: Must be a positive integer.");
        return;
    }

    let slotTimes = {
        1: "08:30 - 10:00",
        2: "10:30 - 12:00",
        3: "12:15 - 13:45",
        4: "14:15 - 15:45",
        5: "16:00 - 17:30",
    };

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let [startTime, endTime] = slotTimes[slot].split(" - ");

    function formatDateTime(date, time) {
        let [hours, minutes] = time.split(":").map(Number);
        let newDate = new Date(date);
        newDate.setHours(hours, minutes, 0);

        return new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/Berlin",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        }).formatToParts(newDate).reduce((acc, { type, value }) => {
            acc[type] = value;
            return acc;
        }, {});
    }

    let schedule = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Mohammed Abdelazim//Uni Schedule//EN\n`;

    let currentDate = new Date();
    let dayDifference = (weekDay - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + dayDifference);

    console.log(`Starting date adjusted to: ${currentDate.toDateString()}`);

    for (let i = 0; i < numWeeks; i++) {
        let weekOffset = i * (repetitionType === "weekly" ? 7 : 14);
        let eventDate = new Date(currentDate);
        eventDate.setDate(eventDate.getDate() + weekOffset);

        let dtStartParts = formatDateTime(eventDate, startTime);
        let dtEndParts = formatDateTime(eventDate, endTime);

        let dtStart = `${dtStartParts.year}${dtStartParts.month}${dtStartParts.day}T${dtStartParts.hour}${dtStartParts.minute}00`;
        let dtEnd = `${dtEndParts.year}${dtEndParts.month}${dtEndParts.day}T${dtEndParts.hour}${dtEndParts.minute}00`;

        schedule += `BEGIN:VEVENT\nSUMMARY:${courseName} (${sessionType})\nLOCATION:${location}\n`;
        schedule += `DTSTART:${dtStart}\nDTEND:${dtEnd}\nDESCRIPTION:Instructor: ${instructorName}, Course Code: ${courseCode}\nEND:VEVENT\n`;
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
