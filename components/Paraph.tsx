import { FC, useMemo, useState, useRef, LegacyRef } from "react";
import { Button } from "react-bootstrap";

interface IParaphProps {
  lines?: number,
  className?: string
}

const Paraph: FC<IParaphProps> = ({ lines = 1, className = '', children }) => {
  const [more, showMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const style = useMemo(() => {
    return {
      maxHeight: more ? 'unset' : `${1.5 * lines}rem`,
      overflowY: 'hidden'
    }
  }, [lines, more])

  const calcHasMore: LegacyRef<HTMLParagraphElement> = (ref: HTMLParagraphElement) => {
    if (!ref) setHasMore(false)
    else setHasMore(ref.scrollHeight > ref.offsetHeight)
  }
  return (
    <div>
      <p ref={calcHasMore} className={`${className}`} style={style}>
        {children}
      </p>
      {hasMore ? <Button size="sm" variant="outline-info" onClick={() => showMore(!more)}>
        see more...
      </Button> : null}
    </div>
  )
}

export default Paraph