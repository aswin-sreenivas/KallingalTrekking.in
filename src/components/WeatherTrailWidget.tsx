import React, { useState, useEffect } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Mountain,
  Sunrise,
  Sunset,
  Thermometer,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface WeatherTrailWidgetProps {
  onOpenBookingModal: (packageName?: string) => void;
}

interface WeatherData {
  location: string;
  elevation: string;
  coordinates: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    cloudCover: number;
    precipitation: number;
    weatherCode: number;
    isDay: number;
  };
  daily: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    rainProb: number;
    weatherCode: number;
    sunrise: string;
    sunset: string;
  }>;
}

export const WeatherTrailWidget: React.FC<WeatherTrailWidgetProps> = ({ onOpenBookingModal }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchWeatherData = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/banasura-weather');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setWeather(data);
        }
      }
    } catch (err) {
      console.error('Error fetching Banasura weather:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Helper to interpret WMO weather code
  const getWeatherInfo = (code: number) => {
    if (code === 0) return { label: 'Clear Blue Skies', icon: Sun, bg: 'bg-amber-500/10 text-amber-600', condition: 'Ideal' };
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy / Misty', icon: Cloud, bg: 'bg-sky-500/10 text-sky-600', condition: 'Great' };
    if (code >= 51 && code <= 67) return { label: 'Light Mountain Drizzle', icon: CloudRain, bg: 'bg-blue-500/10 text-blue-600', condition: 'Caution' };
    if (code >= 80) return { label: 'Heavy Shola Rain', icon: CloudRain, bg: 'bg-indigo-500/10 text-indigo-700', condition: 'Challenging' };
    return { label: 'Mountain Mist', icon: Cloud, bg: 'bg-emerald-500/10 text-emerald-600', condition: 'Good' };
  };

  // Derive trail condition indicators
  const getTrailConditions = (w: WeatherData) => {
    const rain = w.current.precipitation;
    const humidity = w.current.humidity;
    const wind = w.current.windSpeed;

    const summitStatus = rain > 5 ? 'CAUTION' : wind > 30 ? 'HIGH WIND' : 'OPEN & EXCELLENT';
    const seaOfCloudsProb = humidity > 75 && w.current.temperature < 25 ? 'High (85%)' : 'Moderate (55%)';
    const trailGrip = rain > 2 ? 'Slippery (Trekking Poles Recommended)' : 'Dry & Firm';
    const jeepTrack = rain > 10 ? '4x4 Low-Range Required' : '4x4 Offroad Ready';

    return { summitStatus, seaOfCloudsProb, trailGrip, jeepTrack };
  };

  const weatherInfo = weather ? getWeatherInfo(weather.current.weatherCode) : null;
  const trailConditions = weather ? getTrailConditions(weather) : null;
  const WeatherIcon = weatherInfo ? weatherInfo.icon : Sun;

  return (
    <section id="weather" className="py-20 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D47A1]/20 via-transparent to-slate-950/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Banasura Hills Live Status
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
              Live meteorological readings and trail safety assessments for Padinjarathara Basecamp & Banasura Peak Summit (2,073 m).
            </p>
          </div>

          <button
            onClick={fetchWeatherData}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : 'text-slate-400'}`} />
            <span>{isRefreshing ? 'Updating...' : 'Refresh Live Data'}</span>
          </button>
        </div>

        {/* Main Weather & Trail Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Live Weather Primary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400 block">Location</span>
                  <h3 className="font-heading font-bold text-lg text-white">Banasura Hills Basecamp</h3>
                  <span className="text-xs text-slate-400 font-mono">11.7036° N, 75.9449° E • Elevation 2,073m</span>
                </div>
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Mountain className="w-7 h-7" />
                </div>
              </div>

              {/* Temperature & Main Conditions */}
              {isLoading || !weather ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Loading Banasura Hills meteorological feed...
                </div>
              ) : (
                <div className="py-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-6xl text-white">{weather.current.temperature}°</span>
                      <span className="text-xl text-slate-400 font-bold">C</span>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        <WeatherIcon className="w-4 h-4" />
                        <span>{weatherInfo?.label}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Feels like {weather.current.feelsLike}°C</p>
                    </div>
                  </div>

                  {/* Weather Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
                      <Wind className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Wind</span>
                      <span className="font-heading font-bold text-sm text-white">{weather.current.windSpeed} km/h</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
                      <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Humidity</span>
                      <span className="font-heading font-bold text-sm text-white">{weather.current.humidity}%</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
                      <Cloud className="w-4 h-4 text-slate-300 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Clouds</span>
                      <span className="font-heading font-bold text-sm text-white">{weather.current.cloudCover}%</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
                      <Thermometer className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Rain</span>
                      <span className="font-heading font-bold text-sm text-white">{weather.current.precipitation} mm</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sun Cycle Bar */}
            {weather && (
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Sunrise className="w-4 h-4 text-amber-400" />
                  <span>Sunrise: <strong className="text-white">{weather.daily[0]?.sunrise} AM</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Sunset className="w-4 h-4 text-orange-400" />
                  <span>Sunset: <strong className="text-white">{weather.daily[0]?.sunset} PM</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 3-Day Forecast & Book Today CTA (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

            {/* 3-Day Forecast Strip & Book Today CTA */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Forecast preview */}
              <div className="w-full sm:w-auto flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">3-Day Banasura Peak Outlook</span>
                <div className="flex items-center gap-3">
                  {weather?.daily.map((d, i) => (
                    <div key={i} className="flex-1 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 font-bold block">{i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : 'Day 3'}</span>
                      <span className="font-heading font-bold text-xs text-white">{d.minTemp}° - {d.maxTemp}°C</span>
                      <span className="text-[10px] text-sky-400 font-medium block">☔ {d.rainProb}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Book CTA Button */}
              <button
                onClick={() => onOpenBookingModal('Banasura Peak Summit Trek')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#1565C0] hover:bg-blue-600 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-900/40 shrink-0"
              >
                <span>Book Today's Trek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
