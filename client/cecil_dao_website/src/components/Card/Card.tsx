import { Link } from "react-router-dom";
import "./index.scss";
import "../Button/index.scss";

type TCard = {
  img: string;
  title: string;
  link: string;
  description: string;
  className: string;
}

const Card = ({ img, title, link, description, className }: TCard) => {

  return (
    <div className={`card ${className}`}>
      <img src={img} alt={img} className="mb-4" />
      <div className="flex flex-col items-center gap-4 pl-10 pr-10">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="button">Explore</Link>
      </div>
    </div>
  )
}

export default Card;