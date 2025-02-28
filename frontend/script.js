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

    if (!courseName || !slot || !weekDay || !numWeeks) {
        alert("Please fill in all required fields.");
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

    let schedule = `Course: ${courseName} (${courseCode})\nInstructor: ${instructorName}\nLocation: ${location}\n`;g
    schedule += `Session: ${sessionType}\nTime: ${slotTimes[slot]}\nDay: ${weekdays[weekDay]}\nRepeats: ${repetitionType}\nWeeks: ${numWeeks}\n\n`;

    for (let i = 0; i < numWeeks; i++) {
        let weekNum = i * (repetitionType === "weekly" ? 1 : 2);
        schedule += `Week ${i + 1}: ${weekdays[weekDay]} at ${slotTimes[slot]}\n`;
    }

    document.getElementById("output").innerText = schedule;
}
