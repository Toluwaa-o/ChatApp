const Input = ({ type, placeholder, name, text, value, onChange }) => {
  return (
    <span>
      <label
        className="block font-medium text-lg text-gray-600 "
        htmlFor={name}
      >
        {text}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="p-2 md:p-3 outline-blue-300 border border-gray-200 w-full rounded-lg mt-2 text-lg"
      />
    </span>
  );
};

export default Input;
