import * as React from "react"
import * as containerStyles from "./playlist.module.css"

// see https://github.com/gatsbyjs/gatsby/issues/22948
// and https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
const useLink = link => {
  const [stateLink, setStateLink] = React.useState("")

  React.useEffect(() => {
    setStateLink(link)
  }, [link])

  return stateLink
}

const Playlist = React.forwardRef(({ playlist, lazy }, ref) => {
  const link = useLink(playlist.url)
  const [showImage, setShowImage] = React.useState(!lazy)

  React.useImperativeHandle(ref, () => ({
    el: ref.current,
    showImage: () => {
      setShowImage(true)
    },
  }))

  return (
    <li className={containerStyles.event} ref={ref} id={link}>
      <a href={link} className={containerStyles.bigLink}>
        {playlist.image && showImage && (
          <img
            role="presentation"
            src={playlist.image}
            alt={`${playlist.title} thumbnail`}
            className={containerStyles.poster}
          />
        )}

        <div className={containerStyles.details}>
          <h3 className={containerStyles.title}>{playlist.title}</h3>
          {playlist.subtitle && <p>{playlist.subtitle}</p>}
          <p>{playlist.timestamp}</p>
          <p className={containerStyles.tags}>{playlist.tags.join(", ")}</p>
        </div>
      </a>
    </li>
  )
})

export default Playlist
