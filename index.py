from flask import Flask, request, jsonify
from gtts import gTTS # type: ignore
import os
import speech_recognition as sr # type: ignore

app = Flask(__name__)

@app.route('/process_speech', methods=['POST'])
def process_speech():
    data = request.get_json()
    text = data['text']
    
    print("Распознанная речь:", text)
    
   
    tts = gTTS(text=text, lang='ru')
    tts.save('output.mp3')  
    
    
    return jsonify({'status': 'success', 'audio_file': 'output.mp3'})

if __name__ == '__main__':
    app.run(debug=True)
