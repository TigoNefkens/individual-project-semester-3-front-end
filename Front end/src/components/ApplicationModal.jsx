import React from "react";
import "./ApplicationModal.css"

export default function ApplicationModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="applicationmodal-overlay" onClick={onClose}>
        <div
          className="applicationmodal-content"
          onClick={(e) => e.stopPropagation()}
        >
        
        {children}
      </div>
    </div>
  );
}