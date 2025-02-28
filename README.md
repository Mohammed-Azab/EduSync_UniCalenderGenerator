# University Course Schedule Generator

This Python script generates `.ics` calendar files for university courses, allowing students to easily import their schedules into calendar applications.

## Features
- Prompts users to enter course details.
- Requires a time slot (1-5) and weekday selection.
- Asks for the number of weeks before deciding weekly/biweekly repetition.
- Ensures courses with 2 or fewer weeks default to weekly.
- Generates `.ics` files that can be imported into Google Calendar, Outlook, etc.

## Requirements
- Python 3.x
- Required packages: `icalendar`, `pytz`

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. Navigate to the project folder:
   ```bash
   cd <your-repo-name>
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage
Run the script:
```bash
python EduSync.py
```
Follow the prompts to enter course details. The script will generate `.ics` files in the `output/` directory.

## Contributing
Feel free to fork the project, make improvements, and submit a pull request!

## License
MIT License
