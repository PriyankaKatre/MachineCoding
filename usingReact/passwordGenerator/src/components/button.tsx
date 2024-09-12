interface buttonProps {
  text: string;
  customClass: string;
  onClick: () => void;
}

const Button = ({ text, customClass, onClick }: buttonProps) => {
  return (
    <div>
      <button className={customClass} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button
