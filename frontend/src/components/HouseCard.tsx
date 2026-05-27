import { House } from "types/house";

export default function HouseCard({ house }: { house: House }) {
  return (
    <article className="card">
      <img src={house.image_url} alt={house.title} className="house-image" />
      <h3>{house.title}</h3>
      <p>{house.city} - {house.location}</p>
      <p>${house.price}</p>
      <p>{house.nearby}</p>
      <iframe title={house.title} src={`https://maps.google.com/maps?q=${encodeURIComponent(house.location+','+house.city)}&z=15&output=embed`} className="map" />
    </article>
  );
}
