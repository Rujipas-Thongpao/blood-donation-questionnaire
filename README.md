# Spoken Health Questionnaire for Blood Donation

## Overview
This is a Next.js-based application designed to assist individuals who cannot read Thai or are visually impaired by providing a spoken health questionnaire before blood donation. The app plays back health-related questions in both English and Thai, allowing users to listen and respond accordingly.

## Features
- Spoken health questionnaire for blood donation
- Display messages from a JSON file
- Scrollable message list with auto-scroll to the active message
- Play/pause audio associated with each message
- Navigate between messages with next/previous buttons
- Toggle between English and Thai language messages
- Render HTML content within messages safely

## Technologies Used
- **Next.js** (React Framework)
- **Tailwind CSS** (for styling)
- **TypeScript** (for type safety)
- **Dompurify** (for sanitizing HTML content in messages)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/questionnaire-app.git
   cd questionnaire-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## File Structure
```
/questionnaire-app
│── public/
│   ├── message.json  # Stores questionnaire messages with text, language, and audio paths
│   ├── audio/        # Folder for storing audio files
│── app/
│   ├── components/
│   │   ├── Message.tsx  # MessageBox component
│   ├── page.tsx        # Main page with message list and controls
│── styles/            # Tailwind CSS configuration
│── README.md
│── package.json
```

## How to Use
1. **Navigate questions**: Use the "Next" and "Previous" buttons to switch between questions.
2. **Play/Pause audio**: Click the play/pause button to control the audio playback.
3. **Toggle language**: Click the "Switch to Thai/English" button to change the displayed question language.
4. **Listen to formatted text**: Messages can contain bold, italic, and other HTML formatting for better comprehension.

## Message JSON Format
The `message.json` file should follow this structure:
```json
[
  {
    "id": 1,
    "message_en": "<strong>Do you have any existing medical conditions?</strong>",
    "message_th": "<strong>คุณมีโรคประจำตัวหรือไม่?</strong>",
  }
]
```

## Future Enhancements
- Add user authentication
- Support for additional languages
- Database integration for dynamic question storage
- Voice recognition for user responses

## License
This project is licensed under the MIT License.

## Contact
For any issues or suggestions, please open an issue on the repository.

---
Thank you for using this application to make blood donation more accessible! 🚀

