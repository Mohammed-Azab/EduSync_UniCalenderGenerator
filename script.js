function generateSchedule() {
    let courseName = document.getElementById("courseName").value;
    let courseCode = document.getElementById("courseCode").value || "N/A";
    let instructorName = document.getElementById("instructorName").value || "N/A";
    let location = document.getElementById("location").value || "N/A";
    let sessionType = document.getElementById("sessionType").value;
    let slot = parseInt(document.getElementById("slot").value);
    let weekDay = parseInt(document.getElementById("weekDay").value);
    let numWeeks = parseInt(document.getElementById("numWeeks").value);
    let repetitionType = document.getElementById("repetitionType").value;

    if (!courseName || !slot || !numWeeks) {
        alert("Please fill in all required fields: Course Name, Slot, and Number of Weeks.");
        return;
    }

    let slotTimes = {
        1: { start: "08:30", end: "10:00" },
        2: { start: "10:30", end: "12:00" },
        3: { start: "12:15", end: "13:45" },
        4: { start: "14:15", end: "15:45" },
        5: { start: "16:00", end: "17:30" },
    };

    let weekdays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

    // Start building ICS file
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Uni Calendar//EN\nCALSCALE:GREGORIAN\n`;

    let now = new Date();
    let startDate = new Date(now.getFullYear(), 0, 1); // Start of the year
    while (startDate.getDay() !== weekDay) {
        startDate.setDate(startDate.getDate() + 1); // Move to the first correct weekday
    }

    for (let i = 0; i < numWeeks; i++) {
        let eventStart = new Date(startDate);
        eventStart.setDate(startDate.getDate() + i * (repetitionType === "weekly" ? 7 : 14));

        let eventStartDate = `${eventStart.getFullYear()}${String(eventStart.getMonth() + 1).padStart(2, "0")}${String(eventStart.getDate()).padStart(2, "0")}T${slotTimes[slot].start.replace(":", "")}00`;
        let eventEndDate = `${eventStart.getFullYear()}${String(eventStart.getMonth() + 1).padStart(2, "0")}${String(eventStart.getDate()).padStart(2, "0")}T${slotTimes[slot].end.replace(":", "")}00`;

        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${courseName} - ${sessionType}\n`;
        icsContent += `DESCRIPTION:Instructor: ${instructorName}\\nLocation: ${location}\\nCourse Code: ${courseCode}\n`;
        icsContent += `LOCATION:${location}\n`;
        icsContent += `DTSTART:${eventStartDate}Z\n`;
        icsContent += `DTEND:${eventEndDate}Z\n`;
        icsContent += `RRULE:FREQ=${repetitionType.toUpperCase()};COUNT=${numWeeks};BYDAY=${weekdays[weekDay]}\n`;
        icsContent += `END:VEVENT\n`;
    }

    icsContent += `END:VCALENDAR`;

    // Create a downloadable .ics file
    let blob = new Blob([icsContent], { type: "text/calendar" });
    let url = URL.createObjectURL(blob);

    let downloadLink = document.getElementById("downloadLink");
    downloadLink.href = url;
    downloadLink.download = `${courseName.replace(/\s+/g, '_')}_Schedule.ics`;
    downloadLink.style.display = "block";

    document.getElementById("output").innerText = "ICS file generated. Click the link below to download.";
}
