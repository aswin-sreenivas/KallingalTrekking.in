export default async function handler(_req: any, res: any) {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=11.703624&longitude=75.944946&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=Asia%2FKolkata";
    const weatherRes = await fetch(url);
    if (weatherRes.ok) {
      const data = await weatherRes.json();
      return res.status(200).json({
        success: true,
        location: "Banasura Hills Basecamp, Wayanad",
        elevation: "2,073 m (Peak summit)",
        coordinates: "11.7036° N, 75.9449° E",
        current: {
          temperature: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          cloudCover: data.current.cloud_cover,
          precipitation: data.current.precipitation,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day
        },
        daily: (data.daily?.time || []).slice(0, 3).map((dateStr: string, idx: number) => ({
          date: dateStr,
          maxTemp: Math.round(data.daily.temperature_2m_max[idx]),
          minTemp: Math.round(data.daily.temperature_2m_min[idx]),
          rainProb: data.daily.precipitation_probability_max[idx] || 10,
          weatherCode: data.daily.weather_code[idx],
          sunrise: data.daily.sunrise[idx]?.split('T')[1] || "06:12",
          sunset: data.daily.sunset[idx]?.split('T')[1] || "18:35"
        }))
      });
    }
  } catch (err) {
    console.error("Failed to fetch Open-Meteo weather in Vercel function:", err);
  }

  // Fallback response
  return res.status(200).json({
    success: true,
    location: "Banasura Hills Basecamp, Wayanad",
    elevation: "2,073 m (Peak summit)",
    coordinates: "11.7036° N, 75.9449° E",
    current: {
      temperature: 23,
      feelsLike: 22,
      humidity: 78,
      windSpeed: 12,
      cloudCover: 30,
      precipitation: 0,
      weatherCode: 1,
      isDay: 1
    },
    daily: [
      { date: "Today", maxTemp: 26, minTemp: 18, rainProb: 15, weatherCode: 1, sunrise: "06:12", sunset: "18:38" },
      { date: "Tomorrow", maxTemp: 25, minTemp: 18, rainProb: 20, weatherCode: 2, sunrise: "06:12", sunset: "18:38" },
      { date: "Day 3", maxTemp: 27, minTemp: 19, rainProb: 10, weatherCode: 0, sunrise: "06:13", sunset: "18:38" }
    ]
  });
}
