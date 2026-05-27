"use client";

export default function LanguageSwitcher({ language, setLanguage }: { language: "en" | "mm"; setLanguage: (v: "en" | "mm") => void }) {
  return (
    <div>
      <button onClick={() => setLanguage("en")}>EN</button> | <button onClick={() => setLanguage("mm")}>မြန်မာ</button>
    </div>
  );
}
