"use client";
import { useEffect, useState } from "react";
import HouseCard from "components/HouseCard";
import HouseForm from "components/HouseForm";
import LanguageSwitcher from "components/LanguageSwitcher";
import { fetchHouses } from "services/houseApi";
import { House } from "types/house";
import "./styles.css";

const t = {
  en: { title: "Myanmar House Rental", subtitle: "Find houses, apartments, and shared houses", search: "Search", marketing: "Property Expo: Up to 15% off service fee!", contact: "Need help? Chatbot and direct message included." },
  mm: { title: "မြန်မာ အိမ်ခြံမြေ ငှားရမ်း", subtitle: "အိမ်၊ တိုက်ခန်း၊ share house ရှာဖွေနိုင်သည်", search: "ရှာဖွေ", marketing: "Property Expo ပရိုမိုးရှင်း!", contact: "မေးခွန်းများအတွက် Chatbot နှင့် message ပါဝင်သည်။" }
};

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "mm">("en");
  const [houses, setHouses] = useState<House[]>([]);
  const [city, setCity] = useState("");
  const [houseType, setHouseType] = useState("");

  const load = async () => setHouses(await fetchHouses(city, houseType));
  useEffect(() => { void load(); }, []);

  return (
    <main className="container">
      <header>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <h1>{t[language].title}</h1><p>{t[language].subtitle}</p>
        <div className="marketing">✨ {t[language].marketing}</div>
      </header>
      <section className="card search">
        <input placeholder="Yangon" value={city} onChange={(e)=>setCity(e.target.value)} />
        <select value={houseType} onChange={(e)=>setHouseType(e.target.value)}><option value="">All</option><option value="house">House</option><option value="apartment">Apartment</option><option value="share-house">Share House</option></select>
        <button onClick={load}>{t[language].search}</button>
      </section>
      <HouseForm onCreated={load} />
      <section className="grid">{houses.map((h)=><HouseCard key={h.id} house={h} />)}</section>
      <footer className="card">{t[language].contact}</footer>
    </main>
  );
}
