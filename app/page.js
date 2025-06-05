'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (messages.length > 0) {
      r.start();
      setIsListening(true)
    }
  }, [messages])


  let SpeechRecognition = null;
  let synth = null;

  if (typeof window != "undefined") {
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    synth = window.speechSynthesis;
  }

  if (!SpeechRecognition || !synth) {
    console.error("SpeechRecognition is not supported in this browser.");
  }

  let r;
  if (typeof window !== 'undefined') {
    r = new SpeechRecognition();
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.lang = "hi-IN"

    r.onstart = function () {
      console.log("Speech recognition started");
    };

    r.onresult = async function (event) {
      // console.log("Speech recognition result");
      const transcript = event.results[0][0].transcript;
      // console.log("Transcript:", transcript);
      setIsListening(false)

      // console.log(messages)
      const message = messages + transcript + "\n";

      const result = await axios.post("/generate-ai-response", { userMessage: message });
      // console.log(result)
      console.log(result.data.messages)

      // const aiVoiceRes = await axios.post("/generate-ai-tts", { userMessage: result.data.messages })
      // const bufferVoice = aiVoiceRes.data.messages.data;

      const utterance = new SpeechSynthesisUtterance(result.data.messages);
      utterance.lang = 'hi-IN';
      utterance.voiceURI = 'Microsoft Kalpana - Hindi (India)';
      utterance.name = 'Microsoft Kalpana - Hindi (India)';
      utterance.localService = true;
      utterance.default = false;
      synth.speak(utterance);

      utterance.onend = () => {
        const aimessage = message + result.data.messages + "\n";
        // console.log(aimessage)
        setMessages(aimessage)
      }
    };

    r.onend = () => {
      // console.log("Speech recognition ended");
      setIsListening(false)
    }
  }

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setIsProcessing(true);
      // Simulate processing for demo
      setTimeout(() => {
        setIsProcessing(false);
        r.start();
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Voice Assistant
          </h1>
          <p className="text-gray-400 mt-2">Your intelligent voice companion</p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-800/50 rounded-2xl p-4 h-[60vh] overflow-y-auto mb-8 backdrop-blur-sm">
          <AnimatePresence>
            {messages?.split('\n').filter(msg => msg.trim()).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${index % 2 === 0
                    ? 'bg-blue-600/20 border border-blue-400/20'
                    : 'bg-purple-600/20 border border-purple-500/20'
                    }`}
                >
                  <p className="text-gray-200">{message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Voice Control */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`relative p-6 rounded-full ${isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors duration-200`}
          >
            {isProcessing ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        </div>

        {/* Status Indicator */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            {isProcessing
              ? 'Processing...'
              : isListening
                ? 'Listening...'
                : 'Click the microphone to start'}
          </p>
        </div>
      </div>
    </main>
  );
}
