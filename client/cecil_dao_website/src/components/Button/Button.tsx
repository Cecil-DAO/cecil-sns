import { FC, PropsWithChildren } from "react";
import "./index.scss";

const Button: FC<PropsWithChildren> = ({children}) => {

  return (
    <button className="button">
      {children}
    </button>
  )
}

export default Button;