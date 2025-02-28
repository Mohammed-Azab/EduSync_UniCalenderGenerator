# University Course Schedule Generator

EduSync is a Python script that generates `.ics` calendar files for university courses, allowing students to easily import their schedules into calendar applications like Google Calendar and Outlook.

## Features
- Interactive prompts for entering course details.
- Requires a time slot (1-5) and weekday selection.
- Allows weekly or biweekly session repetition.
-  Supports Lectures, Tutorials, and Lab sessions.
- Saves schedules in structured `.ics` files for easy import.
- **NEW:** Automatically skips sessions on German public holidays.

## Requirements
- Python 3.x
- Required packages: `icalendar`, `pytz`, `holidays`

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

### Holiday Skipping
- The script checks German public holidays and **skips sessions falling on those days**.
- If a session falls on a holiday, it will be moved to the next available week.

## Contributing
Contributions are welcome! Feel free to fork the repository, make improvements, and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

