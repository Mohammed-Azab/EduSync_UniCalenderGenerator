# University Course Schedule Generator

EduSync is a Python script that generates `.ics` calendar files for university courses, allowing students to easily import their schedules into calendar applications like Google Calendar and Outlook.

## Features
- Interactive prompts for entering course details.
- Requires a time slot (1-5) and weekday selection.
- Asks for the number of weeks before deciding weekly/biweekly repetition.
- Automatically defaults to weekly for courses lasting 2 weeks or fewer.
- Saves schedules in structured `.ics` files for easy import.

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
Contributions are welcome! Feel free to fork the repository, make improvements, and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

