# Namma Rakshane Chatbot Project

## Overview
This project is a medical diagnostic assistant chatbot that allows users to interact and receive medical advice based on their symptoms. The chatbot is designed using a Flask backend with a generative AI model and a simple HTML/CSS frontend.

## Prerequisites
- **Python 3.11 or above**
- **Node.js** (for any frontend package management if needed)
- **Pip** (Python package installer)

## Project Structure
```
/Namma_Rakshane/
│
├── index.html       # Main HTML file (Splash Screen)
├── members.html       # Main HTML file (Members Adding Page)
├── chatPage.html       # Main HTML file (Connect to Backend and run the ChatBot)
│
├── /backend/            # Python files for the backend
│   ├── gemini_chatbot.py # AI model integration
│   ├── hostedAI.py      # Flask server setup
│   └── requirements.txt      # Python dependencies
├── /styles/
└── /scripts/
```

## Setup Instructions

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Namma_Rakshane/backend
   ```

2. **Create a Python Virtual Environment**
   Ensure you have Python 3.11 or above installed.
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Required Packages**
   Inside the activated virtual environment, run:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set Up Environment Variables**
   Create a `.env` file in the backend directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

6. **Run the Backend Server**
   Start the Flask server:
   ```bash
   python hostedAI.py
   ```

   The server will be running at `http://localhost:8000/chat`.

### Frontend Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Open the HTML File**
   Open `index.html` in your web browser. You can simply double-click the file or use a local server for better testing (e.g., using Live Server extension in VSCode).

## Important Notes
- **Authentication**: The authentication part has been kept separate and is not integrated into this version of the project.
- **Local Storage**: For safety reasons, all patient details are currently stored in the browser's local storage.
- **Emergency Button**: The emergency button feature will be integrated in future updates.

## Review and Demo
This project is in its initial stages. Please review the current features and feel free to provide feedback for improvements. Future updates will focus on enhancing functionality and integrating additional features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.