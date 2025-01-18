function startSpeechRecognition() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.onresult = function (event) {
    var result = event.results[0][0].transcript;
    document.getElementById("speechRecognitionOutput").innerHTML = result;

   
    if (result.toLowerCase().includes("красный")) {
      document.body.style.backgroundColor = "red";
    } else if (result.toLowerCase().includes("негр")) {
      document.body.style.backgroundColor = "black";
    } else if (result.toLowerCase().includes("зелёный")) {
      document.body.style.backgroundColor = "green";
    } else if (result.toLowerCase().includes("оранжевый")) {
      document.body.style.backgroundColor = "orange";
    } else if (result.toLowerCase().includes("синий")) {
      document.body.style.backgroundColor = "blue";
    } else if (result.toLowerCase().includes("фиолетовый")) {
      document.body.style.backgroundColor = "purple";
    } else if (result.toLowerCase().includes("розовый")) {
      document.body.style.backgroundColor = "pink";
    } else if (result.toLowerCase().includes("белый")) {
      document.body.style.backgroundColor = "white";
    } else if (result.toLowerCase().includes("голубой")) {
      document.body.style.backgroundColor = "aqua";
    } else {
      document.body.style.backgroundColor = "white";
    }

    
    fetch("/process_speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: result }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.audio_file) {
          var audio = new Audio(data.audio_file);
          audio.play();
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  };
  recognition.start();
}
