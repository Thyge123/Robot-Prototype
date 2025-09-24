Vue.createApp({
  data() {
    return {
      message: "Robot Answering System",
      RobotRequest: [
        {
          id: 1,
          Question: "What do you do?",
          Answer: "I am a robot designed to assist you.",
        },
        {
          id: 2,
          Question: "Help me find room D.2.08",
          Answer: "Room D.2.08 is located on the second floor.",
        },
        {
          id: 3,
          Question: "Where is the cafeteria?",
          Answer: "The cafeteria is on the first floor.",
        },
        {
          id: 4,
          Question: "Are there any events today?",
          Answer: "Yes, there is a meeting in room D.2.08 at 2 PM.",
        },
        {
          id: 5,
          Question: "What is the Wi-Fi password?",
          Answer: "The Wi-Fi password is 'welcome123'.",
        },
        {
          id: 6,
          Question: "Are there any restrooms nearby?",
          Answer: "Yes, there are restrooms on each floor.",
        },
        {
          id: 7,
          Question: "Are there any clubs I can join?",
          Answer:
            "Yes, we have several clubs including a robotics club and a book club.",
        },
        {
          id: 8,
          Question: "Where is the student council office?",
          Answer: "The student council office is located in Building A.",
        },
        {
          id: 9,
          Question: "Where is the reception?",
          Answer: "The reception is located in Building A.",
        },
        {
          id: 10,
          Question: "Where does Friday bar take place?",
          Answer: "Friday bar takes place in the Building E every Friday.",
        },
      ],
      selectedRequest: null,
      timer: null,
      voices: [],
    };
  },
  created() {
    // Load voices when they are available
    if ("onvoiceschanged" in speechSynthesis) {
      speechSynthesis.onvoiceschanged = this.loadVoices;
    }
    this.loadVoices(); // Initial load attempt
  },
  methods: {
    loadVoices() {
      this.voices = speechSynthesis.getVoices();
    },
    selectRequest(request) {
      this.selectedRequest = request;
      this.Speak(); // Call Speak method when a request is selected
      clearTimeout(this.timer); // Clear any existing timer
      this.timer = setTimeout(() => {
        this.selectedRequest = null;
      }, 10000); // Deselect after 10 seconds
    },
    // Method to handle speech synthesis
    Speak() {
      speechSynthesis.cancel(); // Cancel any ongoing speech

      const text = this.selectedRequest
        ? this.selectedRequest.Answer
        : "No answer selected.";

      const utterance = new SpeechSynthesisUtterance(text);

      // Find and set a Google voice
      const googleVoice = this.voices.find(
        (voice) => voice.name.includes("Google") && voice.lang.startsWith("en")
      );

      if (googleVoice) {
        utterance.voice = googleVoice;
      } else {
        // Fallback to desired language if Google voice not found
        const desiredLang = "en-US";
        utterance.lang = desiredLang;
      }

      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance); // Speak the text
    },
  },
}).mount("#app");
