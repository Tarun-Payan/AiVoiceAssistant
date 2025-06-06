# AI Voice Assistant

A modern, interactive AI Voice Assistant built with Next.js, React, and browser Speech APIs. This project allows users to interact with an AI using voice commands and receive spoken responses.

## Features

- **Voice Recognition:** Uses the browser's SpeechRecognition API to capture user speech.
- **AI Integration:** Sends user queries to an AI backend for intelligent responses.
- **Text-to-Speech:** Uses the browser's SpeechSynthesis API to speak AI responses aloud.
<!-- - **Multi-language Support:** Easily switch between voices and languages (e.g., Microsoft Zira for English, Microsoft Kalpana for Hindi). -->
- **Modern UI:** Clean, animated chat interface with microphone controls and status indicators.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- A Chromium-based browser (Chrome, Edge) for best voice support
- (Optional) Windows OS for Microsoft voices like Zira and Kalpana

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd AiVoiceAssistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to use the AI Voice Assistant.

## Usage

- Click the microphone button to start speaking.
- The assistant will listen, process your query, and respond with both text and speech.
- The chat interface displays the conversation history.
- The assistant can speak in Hindi (using Microsoft Kalpana) or English (using Microsoft Zira) depending on configuration.

<!-- ## Configuration -->

<!-- - To change the speaking language/voice, modify the relevant section in `app/page.js`:
  - For Hindi: Use `Microsoft Kalpana - Hindi (India)` and set `lang` to `hi-IN`.
  - For English: Use `Microsoft Zira - English (United States)` and set `lang` to `en-US`.
- Ensure the desired voice is installed and available on your system. -->

## Notes

- SpeechRecognition and SpeechSynthesis APIs work best in Chromium-based browsers.
- Some voices (like Microsoft Kalpana) are only available on Windows.
- If a specific voice is not found, the browser will use the default voice.

## License

This project is for educational and personal use. Feel free to modify and enhance it for your needs.
