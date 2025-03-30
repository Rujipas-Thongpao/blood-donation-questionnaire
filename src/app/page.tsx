'use client'
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Message } from '../app/components/Message'
import messageData from '../../public/message.json';

export default function Home() {
  let messageCount = 40;
  const [messages, setMessages] = useState<Message[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);


  useEffect(() => {
    setMessages(messageData as Message[]);
  }, []);

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
    setCurrentMessageIndex((prevIndex) =>
      (prevIndex + 1) % messages.length
    )
  }
  const handlePrevMessage = () => {
    setCurrentMessageIndex((prevIndex) => prevIndex === 0 ? 0 : prevIndex - 1);
  }

  useEffect(() => {
    console.log(audioRef.current)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = messages[currentMessageIndex]?.audioPath || "";
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMessageIndex, messages, isPlaying]);

  return (
    <main>
      {
        messages.length > 0 ? (
          messages.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))
        ) : (
          <p>No messages available.</p> // Fallback when no messages are available
        )
      }
      <h1>{currentMessageIndex}</h1>
      <audio ref={audioRef} />
      <button onClick={handleNextMessage}>Next</button>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={handlePrevMessage}>Previous</button>

    </main>
  );
}

function MessageBox({ message }: { message: Message }) {
  return (
    <div className="message-box">
      <p>{message.message}</p>
    </div>
  );
}