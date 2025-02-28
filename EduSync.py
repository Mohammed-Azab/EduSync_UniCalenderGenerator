import datetime
import os
import pytz
import holidays
from icalendar import Calendar, Event

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SLOT_MAP = {
    1: datetime.time(8, 30),
    2: datetime.time(10, 30),
    3: datetime.time(12, 15),
    4: datetime.time(14, 15),
    5: datetime.time(16, 00),
}

WEEKDAYS = {
    "mon": 0,
    "tue": 1,
    "wed": 2,
    "thu": 3,
    "fri": 4,
    "sat": 5,
    "sun": 6,
}

SESSION_TYPES = ["Lecture", "Tutorial", "Lab"]

GERMAN_HOLIDAYS = holidays.Germany(years=datetime.date.today().year)


def get_session_details():
    course_name = input("Enter course name: ").strip()
    if not course_name:
        print("Course name is required!")
        return get_session_details()

    course_code = input("Enter course code (Press Enter to skip): ").strip()
    instructor_name = input("Enter instructor's name (Press Enter to skip): ").strip()
    instructor_email = input("Enter instructor's email (Press Enter to skip): ").strip()
    location = input("Enter location (Press Enter to skip): ").strip()

    while True:
        print("Select session type:")
        for i, session_type in enumerate(SESSION_TYPES, start=1):
            print(f"{i}. {session_type}")
        session_type_input = input("Enter the number corresponding to the session type: ").strip()
        try:
            session_type_index = int(session_type_input) - 1
            if 0 <= session_type_index < len(SESSION_TYPES):
                session_type = SESSION_TYPES[session_type_index]
                break
            print("Invalid choice. Please enter a valid number.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    while True:
        slot_input = input("Enter slot number (1-5): ").strip()
        try:
            slot = int(slot_input)
            if slot in SLOT_MAP:
                break
            print("Invalid slot. Please enter a number between 1 and 5.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    while True:
        week_day_input = input("Enter the first three letters of the weekday (e.g., Mon, Tue): ").strip().lower()
        if week_day_input in WEEKDAYS:
            week_day = WEEKDAYS[week_day_input]
            break
        print("Invalid weekday. Please enter the first three letters (e.g., Mon, Tue, Wed).")

    while True:
        num_weeks_input = input("For how many weeks should the session repeat? ").strip()
        try:
            num_weeks = int(num_weeks_input)
            if num_weeks > 0:
                break
            print("Please enter a positive number.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    if num_weeks > 2:
        while True:
            repetition_type = input("Should the session repeat weekly or biweekly? (weekly/biweekly): ").strip().lower()
            if repetition_type in ["weekly", "biweekly"]:
                break
            print("Invalid input. Please enter 'weekly' or 'biweekly'.")
    else:
        repetition_type = "weekly"

    return {
        "course_name": course_name,
        "course_code": course_code or "N/A",
        "session_type": session_type,
        "instructor": f"{instructor_name} ({instructor_email})" if instructor_name else "N/A",
        "location": location or "N/A",
        "slot": slot,
        "week_day": week_day,
        "repetition_type": repetition_type,
        "num_weeks": num_weeks,
    }


def create_ics_file(sessions):
    timezone = pytz.timezone("Europe/Berlin")
    today = datetime.date.today()

    for session in sessions:
        subject_dir = os.path.join(OUTPUT_DIR, session["course_name"])
        os.makedirs(subject_dir, exist_ok=True)

        base_filename = os.path.join(subject_dir, session["course_name"])
        filename = f"{base_filename}.ics"
        counter = 1
        while os.path.exists(filename):
            filename = f"{base_filename}_{counter}.ics"
            counter += 1

        cal = Calendar()
        cal.add("prodid", "-//University Schedule//mxm.dk//")
        cal.add("version", "2.0")

        start_date = today + datetime.timedelta(days=(session["week_day"] - today.weekday()) % 7)
        interval = 1 if session["repetition_type"] == "weekly" else 2
        weeks_added = 0

        while weeks_added < session["num_weeks"]:
            if start_date in GERMAN_HOLIDAYS:
                print(f"Skipping {start_date} due to holiday: {GERMAN_HOLIDAYS[start_date]}")
                start_date += datetime.timedelta(weeks=interval)
                continue

            event = Event()
            event.add("summary", f"{session['course_name']} - {session['session_type']}")
            event.add("location", session["location"])

            start_time = SLOT_MAP[session["slot"]]
            end_time = (datetime.datetime.combine(today, start_time) + datetime.timedelta(hours=1, minutes=30)).time()
            event.add("dtstart", timezone.localize(datetime.datetime.combine(start_date, start_time)))
            event.add("dtend", timezone.localize(datetime.datetime.combine(start_date, end_time)))

            event.add("description", f"Instructor: {session['instructor']}\nCourse Code: {session['course_code']}")
            cal.add_component(event)

            weeks_added += 1
            start_date += datetime.timedelta(weeks=interval)

        with open(filename, "wb") as f:
            f.write(cal.to_ical())

        print(f"✅ Schedule saved at {filename}")


sessions = []
while True:
    session = get_session_details()
    if session:
        sessions.append(session)

    another = input("Do you want to add another session? (yes/no): ").strip().lower()
    if another != "yes":
        break

create_ics_file(sessions)
