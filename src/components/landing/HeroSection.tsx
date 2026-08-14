"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";

// Video Links Array
const videos = [
  {
    id: "v1",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674529/7c974cf8-62c3-4030-ab9b-a92c979e0f5d_iptwpr.mp4",
  },
  {
    id: "v2",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674505/41fbb110-7c8e-466d-96be-696f3746f1a7_feqwzh.mp4",
  },
  {
    id: "v3",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674470/e74f137b-87ea-4dac-a219-d632049b5dd8_bqxqkd.mp4",
  },
  {
    id: "v4",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786673132/Doc_Fahad_Hossain_mhbnqh.mp4",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default Muted for seamless Browser Autoplay
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // 🟢 1. Auto-Play Logic & Mute Sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play();
            }
          });
      }
    }
  }, [currentIndex, isMuted]);

  // 🟢 2. Enable Sound on First User Interaction Anywhere on Page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (videoRef.current && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isMuted]);

  // 🟢 3. Scroll Out-of-View Pause Mechanism
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isOutOfView = rect.bottom <= 100 || rect.top >= window.innerHeight;

      if (isOutOfView) {
        if (!videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (videoRef.current.paused && isPlaying) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying]);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
    }
  };

  // Slide Controls
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Fullscreen Toggle
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60dvh] sm:h-[75dvh] md:h-[85dvh] lg:h-[calc(100dvh-80px)] bg-black overflow-hidden group select-none"
    >
      {/* Main Full-Width Video */}
      <video
        ref={videoRef}
        src={videos[currentIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        playsInline
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {/* 🔊 Floating Sound Prompt (Appears when muted) */}
      {isMuted && (
        <button
          onClick={toggleMute}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-xl backdrop-blur-md transition-all animate-bounce hover:scale-105 active:scale-95"
        >
          <VolumeX className="w-4 h-4 text-white" />
          <span>সাউন্ড শুনতে এখানে ক্লিক করুন</span>
        </button>
      )}

      {/* Navigation Arrow Left */}
      <button
        onClick={handlePrev}
        aria-label="Previous Video"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Navigation Arrow Right */}
      <button
        onClick={handleNext}
        aria-label="Next Video"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Modern Overlay Controls Bar at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
        
        {/* Seek / Progress Bar */}
        <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden mb-3 sm:mb-4 cursor-pointer">
          <div
            className="h-full bg-emerald-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          
          {/* Left Controls: Play/Pause, Mute & Slide Index */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90"
              aria-label="Play/Pause"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 sm:p-2.5 rounded-xl backdrop-blur-md transition-all active:scale-90 ${
                isMuted
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
                  : "bg-white/10 hover:bg-white/20 text-emerald-400"
              }`}
              aria-label="Mute/Unmute"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              )}
            </button>

            {/* Video Counter Indicator */}
            <div className="text-xs sm:text-sm font-semibold text-white/80 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              {currentIndex + 1} / {videos.length}
            </div>
          </div>

          {/* Right Controls: Slide Thumbnails & Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dots / Selectors */}
            <div className="flex items-center gap-1.5 mr-2">
              {videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? "w-6 sm:w-8 bg-emerald-500"
                      : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90 hidden sm:flex"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}