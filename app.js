Vue.createApp({
  data() {
    return {
      message: "Robot Answering System",
      RobotRequest: [
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
        },
        { id: 1, Question: "What is your name?", Answer: "My name is Robot." },
        {
          id: 2,
          Question: "What can you do?",
          Answer: "I can assist you with various tasks.",
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
