import "./InputCard.scss";

interface InputCardProps {
  children?: React.ReactNode;
  name: string;
  cardDescription?: string;
}

const InputCard = (props: InputCardProps) => {
  const { children, name, cardDescription } = props;
  return (
    <div className="card-container">
      <div className="card-info">
        <div className="card-name">{name}</div>
        <div className="card-desc">{cardDescription}</div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default InputCard;
