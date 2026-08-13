import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import heroBanasuraImg from '../assets/images/hero_banasura_1784836251352.jpg';

interface HeroProps {
  onOpenBookingModal?: (packageName?: string) => void;
  onNavigate: (sectionId: string) => void;
}

// Local optimized mountain trekking background video
const HERO_VIDEO_SOURCE = '/hero.mp4';

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause handler
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Mute/unmute handler
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[100dvh] py-16 sm:py-20 md:py-28 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video Player */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src={HERO_VIDEO_SOURCE}
          autoPlay
          loop
          muted
          playsInline
          poster={heroBanasuraImg}
          onError={() => setHasVideoError(true)}
          className="w-full h-full object-cover scale-105 filter brightness-95 transition-opacity duration-1000"
        >
          <source src={HERO_VIDEO_SOURCE} type="video/mp4" />
        </video>

        {/* Neutral Dark Overlay Filter (No Blue Tint) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Video Control Bar (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={togglePlay}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-105 focus:outline-none"
          title={isPlaying ? "Pause Video" : "Play Video"}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all shadow-lg hover:scale-105 focus:outline-none"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
        </button>
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center pt-8 sm:pt-14 pb-10">

        {/* Main Heading */}
        <h1 className="font-heading font-extrabold text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight sm:leading-[1.1] text-white drop-shadow-md max-w-4xl px-1">
          Banasura Hills Views <span className="text-blue-300">Jeep Trekking</span> & Safari
        </h1>

        {/* Call to Action Button */}
        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 w-full xs:w-auto px-2 sm:px-0">
          <button
            onClick={() => onNavigate('packages')}
            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-[#0D47A1] hover:bg-[#1565C0] text-white font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl sm:rounded-2xl shadow-xl shadow-blue-900/40 border border-blue-400/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2"
            id="hero-explore-packages-btn"
          >
            <span>Explore Package Details</span>
          </button>
        </div>

      </div>

      {/* Down Scroll Arrow (Desktop/Tablet) */}
      <button
        onClick={() => onNavigate('about')}
        className="hidden md:flex absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors animate-bounce focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Scroll to About Section"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};



