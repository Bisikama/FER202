import React from 'react'
import './OrchidItem.css';
export default function OrchidItem({ orchid }) {
  return (
    <div className="orchid-card">
      {/* <img src={"imgs/" + orchid.image} alt={orchid.name} /> */}
      {/* <h3>{orchid.name}</h3> */}
      <p><strong>Origin:</strong> {orchid.origin}</p>
      <p><strong>Color:</strong> {orchid.color}</p>
      <p><strong>Category:</strong> {orchid.category}</p>
      <p><strong>Rating:</strong> {orchid.rating}⭐</p>
      <p>{orchid.isSpecial ? "🌟 Special Orchid" : "Regular Orchid"}</p>
      <p>{orchid.isNatural ? "Natural" : "Hybrid"}</p>
      <p>❤️ {orchid.numberOfLike} likes</p>

    </div>
  )
}
