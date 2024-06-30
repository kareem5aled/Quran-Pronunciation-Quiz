from flask import Flask, render_template, request, jsonify
import random
import requests
import re


app = Flask(__name__)

API_URL = "https://api-inference.huggingface.co/models/bakrianoo/sinai-voice-ar-stt"
headers = {"Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxx"}

questions = [
    {
        "verse": "الحمد لله رب ..... الرحمن الرحيم",
        "options": ["العالمين", "البشر", "العباد"],
        "answer": "العالمين"
    },
    {
        "verse": "قل أعوذ برب ..... ملك الناس",
        "options": ["الفلق", "الناس", "الخلق"],
        "answer": "الناس"
    },
    {
        "verse": "و الفجر و ليال .....  و الشفع و الوتر",
        "options": ["تسع", "عشر", "سبع"],
        "answer": "عشر"
    },
    {
        "verse": "و السماء و الطارق و ما ..... ما الطارق",
        "options": ["تعلم", "تدري", "أدراك"],
        "answer": "أدراك"
    },
    {
        "verse": "الحمدلله الذي أنزل على عبده ..... و لم يجعل له عوجا",
        "options": ["القرآن", "الكتاب", "التوراة"],
        "answer": "الكتاب"
    }
]

def query(audio_blob):
    response = requests.post(API_URL, headers=headers, data=audio_blob)
    return response.json()

def remove_diacritics(text):
    arabic_diacritics = re.compile(r'[\u064B-\u0652]')
    return re.sub(arabic_diacritics, '', text)

@app.route('/')
def home():
    index = random.randint(0, len(questions) - 1)
    question = questions[index]
    return render_template('index.html', question=question, index=index)

@app.route('/change_question')
def change_question():
    index = random.randint(0, len(questions) - 1)
    question = questions[index]
    return jsonify({'question': question, 'index': index})

@app.route('/submit_audio', methods=['POST'])
def submit_audio():
    file = request.files['audio']
    audio_blob = file.read()
    output = query(audio_blob)
    recognized_text = remove_diacritics(output.get('text', '').strip())

    index = int(request.form['index'])
    current_question = questions[index]

    # Check if the recognized text matches the correct answer
    correct = recognized_text == current_question['answer']
    return jsonify({'text': recognized_text, 'correct': correct})

if __name__ == '__main__':
    app.run(debug=True)
