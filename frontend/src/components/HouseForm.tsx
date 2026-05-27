"use client";
import { useState } from "react";
import { House } from "types/house";
import { createHouse } from "services/houseApi";

const initial: House = { title: "", description: "", house_type: "house", location: "", city: "", price: 0, bedrooms: 1, bathrooms: 1, image_url: "", nearby: "" };

export default function HouseForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState<House>(initial);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createHouse(form);
    setForm(initial);
    onCreated();
  };

  return <form onSubmit={onSubmit} className="card">{Object.entries(form).map(([k,v]) => k!=="id" && <input key={k} placeholder={k} value={String(v)} onChange={(e)=>setForm({...form,[k]: ["price","bedrooms","bathrooms"].includes(k)? Number(e.target.value):e.target.value})} />)}<button type="submit">Upload</button></form>;
}
