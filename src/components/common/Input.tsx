interface TextInputProps {
  type: "email" | "text" | "password";
  style?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  style,
  placeholder,
  required,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder || ""}
      name={name}
      required={required || false}
      className={`${
        style || ""
      } appearance-none placeholder-black p-2.5 h-12 text-black text-2xl border-2 border-transparent focus:outline focus:outline-2 focus:outline-black`}
    />
  );
};

export default TextInput;
