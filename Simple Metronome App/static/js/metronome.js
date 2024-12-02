// Function to update the sound source
//function updateSound(sender,e) {
   //const soundSource = document.getElementById("soundSource"); // Get the source element
   //const audioPlayer = document.getElementById("audio"); // Get the audio player


   //const selectedValue = sender.options[sender.selectedIndex];


   // Use a switch statement to handle each option
   //switch (selectedValue.value) {
   //    case "tick":
   //        soundSource.src = "/static/sounds/tick.mp3";
   //        break;
   //    case "click":
   //        soundSource.src = "/static/sounds/click.mp3";
   //        break;
   //    case "cowbell":
   //        soundSource.src = "/static/sounds/cowbell.mp3";
   //        break;
   //    case "hihat":
   //        soundSource.src = "/static/sounds/hihat.mp3";
   //        break;
   //    case "beep":
   //        soundSource.src = "/static/sounds/beep.mp3";
   //        break;
   //    case "rimshot":
   //        soundSource.src = "/static/sounds/rimshot.mp3";
   //        break;
   //    default:
   //        console.error("Invalid selection");
   //        return; // Exit the function if no valid option is selected
   //}


   // Reload the audio player with the updated source
//    audioPlayer.load();
//    console.log(`Audio source updated to: ${soundSource.src}`); // Debug log
//}


let metronomeInterval;
let audioContext; // Declare a global AudioContext
let currentOscillator = null; // Keeps track of the current oscillator being played
let currentGainNode = null; // Keeps track of the current gain node
let currentVolume = 0.75;

// Initialize AudioContext on window load
window.onload = function () {
    // Create AudioContext but keep it suspended
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Set volume slider to initial value
    const volumeSlider = document.getElementById("volumeSlider");
    volumeSlider.value = currentVolume;
};

function playSound() {
    // Ensure AudioContext is resumed (Chrome requirement)
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    // Creates an Oscillator
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    // Sets Oscillator Frequency and Waveform
    oscillator.frequency.value = 440; // A4 Frequency
    oscillator.type = "sine";

    // Connect oscillator to gain, then to audio context destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set initial volume from the gain volume slider
    gainNode.gain.value = currentVolume;

    // Start Oscillator sound
    oscillator.start(audioContext.currentTime);

    // Stop the oscillator sound after 100ms
    oscillator.stop(audioContext.currentTime + 0.1);

    // Track the current oscillator and gain node
    currentOscillator = oscillator;
    currentGainNode = gainNode;
}

function updateVolume() {
    // Get slider value
    const volumeSlider = document.getElementById("volumeSlider");
    currentVolume = parseFloat(volumeSlider.value);

    // Update the volume of the gain node in real time
    if (currentGainNode) {
        currentGainNode.gain.value = currentVolume;
    }

    // Update displayed volume
    const volumeLevel = document.getElementById("volumeLevel");
    volumeLevel.value = currentVolume;
}

// Attach an event listener to the volume slider to update the volume in real time
document.getElementById("volumeSlider").addEventListener("input", updateVolume);

function startMetronome() {
    // Ensure AudioContext is resumed (Chrome requirement)
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const bpmInput = document.getElementById("bpm"); // Get BPM from input
    const bpm = parseInt(bpmInput.value, 10); // Convert BPM input from a string to an integer
    const subdivisionSelect = document.getElementById("subdivisionSelect"); // Get selected subdivision
    const subdivisions = parseInt(subdivisionSelect.value); // Convert subdivision value to an integer
    const interval = (60000 / bpm) / subdivisions; // Calculate the interval in milliseconds

    const beatIndicator = document.getElementById("beatIndicator"); // Get the beat indicator

    if (metronomeInterval) clearInterval(metronomeInterval); // Clear any pre-existing intervals

    // Start the intervals
    metronomeInterval = setInterval(function () {
        playSound(); // Uses Web Audio API to play the sound

        // Flash the beat indicator every interval
        beatIndicator.style.backgroundColor = "green"; // Change indicator color to green
        setTimeout(() => {
            beatIndicator.style.backgroundColor = "grey"; // Reset beat indicator to grey
        }, 25); // Change from green to grey in 25ms
    }, interval);
}

function stopMetronome() {
    if (metronomeInterval) {
        clearInterval(metronomeInterval); // Stop the metronome sound
        metronomeInterval = null; // Clear the interval variable
    }

    if (currentOscillator) {
        currentOscillator.stop(); // Stop the oscillator
        currentOscillator = null; // Reset oscillator reference
    }
}

// Attach event listeners to buttons
document.getElementById("startButton").addEventListener("click", startMetronome);
document.getElementById("stopButton").addEventListener("click", stopMetronome);

function changeBpm(inc) {
    const bpmInput = document.getElementById("bpm"); // Get BPM from input
    const bpm = parseInt(bpmInput.value, 10); // Convert BPM input from a string to an integer

    let newBpm = bpm + inc; // Add increment value to existing BPM
    bpmInput.value = newBpm; // Change BPM input value to the new number
}


