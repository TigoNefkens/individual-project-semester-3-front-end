import './GlassButton.css';

function GlassButton({ style, children, ...props }) {
  return (
    <button 
      className="button1" 
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export default GlassButton;