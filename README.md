# Project Documentation

## Logic Overview
The project is designed to help users practice Quranic pronunciation through a speech-to-text quiz. Users are presented with a verse containing a missing word and must pronounce the correct option. The application records the user's pronunciation, processes it using a speech-to-text API, and checks the result against the correct answer. Feedback is then displayed to the user.

## Tools Used
- **Flask**: A lightweight web framework for serving the application and handling requests.
- **HTML/CSS**: For structuring and styling the web interface, ensuring a responsive and visually appealing design.
- **JavaScript**: For client-side functionality, including recording audio, handling API responses, and updating the UI dynamically.
- **Google Fonts**: Used to enhance the visual appeal of text with modern fonts for both Arabic and English.
- **[Hugging Face Model](https://huggingface.co/bakrianoo/sinai-voice-ar-stt)**: Utilized to convert recorded audio into text for comparison against the correct answer.

## Setup and How to Run
1. **Clone the Repository**: Clone the project repository to your local machine.
2. **Set Up a Virtual Environment**:
   ```bash
   python3 -m venv venv
   venv\Scripts\activate
   ```
3.  **Install Dependencies**:
    
    ```bash    
    pip install -r requirements.txt
    ```
4.  **Set Up Hugging Face Token**: Replace the placeholder token in the `app.py` with your user-generated Hugging Face token.
5.  **Run the Application**:
    
    bash    
    `python app.py`
    
6.  **Access the Application**: Open a web browser and go to `http://localhost:5000` to access the quiz.

Visual Presentation of the Quiz
-------------------------------

The quiz is visually presented within a spacious white container against a semi-transparent background overlay. The container includes:

*   A heading for the quiz title.
*   A verse with a missing word.
*   Options listed horizontally.
*   Buttons for recording, submitting, and changing questions.
*   A feedback area displaying the result of the pronunciation check.
*   An audio playback control for users to listen to their recordings.
*   If no audio is detected, a message "No audio detected." is displayed.

Limitations of the Solution
---------------------------

*   **Speech Recognition Accuracy**: The accuracy of the speech-to-text conversion heavily depends on the API and can be affected by background noise or pronunciation variations.
*   **Device Compatibility**: Audio recording features may not work consistently across all browsers and devices.
*   **Limited Feedback**: Users receive simple correct/incorrect feedback without detailed pronunciation guidance.

Areas of Improvement
--------------------

*   **Enhanced Feedback**: Incorporate detailed feedback on pronunciation to help users improve.
*   **Multilingual Support**: Expand the quiz to support multiple languages and dialects.
*   **Offline Capability**: Implement offline speech recognition to improve accessibility and reduce dependency on the API.
*   **User Progress Tracking**: Add features to track user progress and provide personalized learning experiences.

