let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let audioBlob;
let currentIndex = document.getElementById('questionIndex').value;

document.getElementById('startRecordingButton').addEventListener('click', async () => {
    if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        audioChunks = [];
        isRecording = true;
        document.getElementById('startRecordingButton').innerText = "Stop Recording";
        document.getElementById('feedback').innerText = "Recording...";
        document.getElementById('feedback').className = '';

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            document.getElementById('submitAudioButton').disabled = false;
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioPlayback = document.getElementById('audioPlayback');
            audioPlayback.src = audioUrl;
            audioPlayback.style.display = "block";
        };
    } else {
        mediaRecorder.stop();
        isRecording = false;
        document.getElementById('startRecordingButton').innerText = "Start Recording";
        document.getElementById('feedback').innerText = "Recording Stopped";
        document.getElementById('feedback').className = '';
    }
});

document.getElementById('submitAudioButton').addEventListener('click', () => {
    if (audioBlob) {
        submitAudio(audioBlob);
    } else {
        document.getElementById('feedback').innerText = "No audio recorded.";
    }
});

function submitAudio(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');
    formData.append('index', currentIndex);

    fetch('/submit_audio', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const feedback = document.getElementById('feedback');
        if (data.text === '') {
            feedback.innerText = 'No audio detected.';
            feedback.style.color = 'black';
        } else if (data.correct) {
            feedback.innerText = `Correct! You said: ${data.text}`;
            feedback.className = 'correct';
        } else {
            feedback.innerText = `Incorrect. You said: ${data.text}`;
            feedback.className = 'incorrect';
        }
    });
}

document.getElementById('changeQuestionButton').addEventListener('click', () => {
    fetch('/change_question')
        .then(response => response.json())
        .then(data => {
            const question = data.question;
            currentIndex = data.index;
            document.getElementById('verse').innerText = question.verse;
            const options = document.querySelector('.options');
            options.innerHTML = '';
            question.options.forEach((option, i) => {
                const p = document.createElement('p');
                if(i==0) {
                    p.innerText = `ت. ${option}`;
                } else if(i==1) {
                    p.innerText = `ب. ${option}`;
                }else{
                    p.innerText = `أ. ${option}`;

                }
                options.appendChild(p);
            });
            // Reset feedback
            document.getElementById('feedback').innerText = '';
            document.getElementById('feedback').className = '';
            document.getElementById('audioPlayback').style.display = "none";
        });
});
