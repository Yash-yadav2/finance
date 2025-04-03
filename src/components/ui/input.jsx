export function Input({ type, placeholder, className, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border px-3 py-2 rounded ${className}`}
        value={value}
        onChange={onChange}
      />
    );
  }
  