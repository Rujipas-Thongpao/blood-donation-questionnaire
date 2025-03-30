'use client'
import { useRef, useState, useEffect } from "react";
import { Message } from '../app/components/Message'
import messageData from '../../public/message.json';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(-1);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'en' | 'th'>('en'); // Language state

  useEffect(() => {
    setMessages(messageData as Message[]);
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      const currentElement = document.getElementById(`message-${currentMessageIndex}`);
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentMessageIndex]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleNextMessage = () => {
    if (currentMessageIndex == -1) {
      setIsPlaying(true);
    }
    setCurrentMessageIndex((prevIndex) =>
      (prevIndex + 1) % messages.length
    )
  }
  const handlePrevMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex === 0 ? 0 : prevIndex - 1);
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = (lang === 'en' ?
        messages[currentMessageIndex]?.audioPath_en :
        messages[currentMessageIndex]?.audioPath_th
      ) || "";
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMessageIndex, messages, isPlaying]);
  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'th' : 'en'));
  };
  return (
    <main className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <button
        className="mb-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded"
        onClick={toggleLanguage}
      >
        Switch to {lang === 'en' ? 'Thai' : 'English'}
      </button>
      <div
        ref={messageContainerRef}
        className="w-full h-full max-w-md h-64 overflow-y-auto border border-gray-300 rounded-lg bg-white p-2"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageBox key={message.id} message={message} isActive={index === currentMessageIndex} index={index} lang={lang} />
          ))
        ) : (
          <p className="text-center text-gray-500">No messages available.</p>
        )}
      </div>

      <audio ref={audioRef} />
      {/* <h1>{currentMessageIndex}</h1> */}

      <button
        className="mt-4 w-full max-w-md h-80 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold  py-3 rounded"
        onClick={handleNextMessage}
      >
        Next
      </button>

      <div className="flex justify-between w-full max-w-md mt-2">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevMessage}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </main>
  );
}

function MessageBox({ message, isActive, index, lang }: { message: Message; isActive: boolean; index: number, lang: string }) {
  return (
    <div
      id={`message-${index}`}
      className={`p-3 my-2 border rounded-lg ${isActive ? 'bg-blue-200 border-blue-500 font-bold' : 'bg-white border-gray-300'}`}
    >
      <p>{lang === 'en' ? message.message_en : message.message_th}</p>
    </div>
  );
}