import React, { useState, useEffect } from "react";
import "./ColourDropdown.css"

function ColourDropdown({ selectedColour, setColour, colors }) {
  
    const [Color, setColor] = useState(selectedColour || "#00CED1");

  useEffect(() => {
    if (selectedColour) setColor(selectedColour);
  }, [selectedColour]);

  const handleChange = (e) => {
    setColor(e.target.value);
    setColour(e.target.value);  
  };

  return (
    <div>
      <select
        value={Color}
        onChange={handleChange}
        style={{
          padding: "6px",
          borderRadius: "6px",
          width: "150px",
          height:"70px",
          backgroundColor: Color,
          color: "#000",
          fontWeight: "600",
        }}
        className="dropdownmenu"
      >
        {colors.map((c) => (
          <option key={c} value={c} style={{ backgroundColor: c }}>
          </option>
        ))}
      </select>
    </div>
  );
}

export default ColourDropdown;