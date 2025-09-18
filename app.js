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
      ],
      selectedRequest: null,
      timer: null,
    };
  },
  methods: {
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
      const desiredLang = "en-US"; // Set desired language code
      utterance.lang = desiredLang;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance); // Speak the text
    },
  },
}).mount("#app");
