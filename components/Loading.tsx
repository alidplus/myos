import { FC } from "react";
import LogoMotion from 'layouts/shared-components/LogoMotion';

interface ILoadingProps {
  show?: boolean,
  width?: number
}

const Loading: FC<ILoadingProps> = ({ show = false, width = 300 }) => {
  if (!show) return null
  return (
    <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bd-white bg-opacity-50">
      <LogoMotion fill='#fff' stroke='#fff' width={width} animate infinite  />
    </div>
  )
}

export default Loading