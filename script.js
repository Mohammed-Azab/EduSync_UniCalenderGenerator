function generateSchedule() {
    let courseName = document.getElementById("courseName").value.trim();
    let courseCode = document.getElementById("courseCode").value.trim() || "N/A";
    let instructorName = document.getElementById("instructorName").value.trim() || "N/A";
    let location = document.getElementById("location").value.trim() || "N/A";
    let sessionType = document.getElementById("sessionType").value;
    let slot = parseInt(document.getElementById("slot").value);
    let weekDay = document.getElementById("weekDay").value ? parseInt(document.getElementById("weekDay").value) : null;
    let numWeeks = parseInt(document.getElementById("numWeeks").value);
    let repetitionType = document.getElementById("repetitionType").value;

    // Validate required fields (Only Course Name, Slot, and Number of Weeks)
    if (!courseName || isNaN(slot) || isNaN(numWeeks) || slot < 1 || numWeeks < 1) {
        alert("Please fill in Course Name, Slot (1-5), and Number of Weeks.");
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

    let schedule = `Course: ${courseName} (${courseCode})\nInstructor: ${instructorName}\nLocation: ${location}\n`;
    schedule += `Session: ${sessionType}\nTime: ${slotTimes[slot]}\n`;

    if (weekDay !== null) {
        schedule += `Day: ${weekdays[weekDay]}\n`;
    }

    schedule += `Repeats: ${repetitionType}\nWeeks: ${numWeeks}\n\n`;

    for (let i = 0; i < numWeeks; i++) {
        let weekNum = i * (repetitionType === "weekly" ? 1 : 2);
        schedule += `Week ${i + 1}: ${weekDay !== null ? weekdays[weekDay] : "TBD"} at ${slotTimes[slot]}\n`;
    }

    document.getElementById("output").innerText = schedule;
}
