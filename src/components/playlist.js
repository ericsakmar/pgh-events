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

const Playlist = React.forwardRef(({ playlist, lazy, type }, ref) => {
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
      <a
        href={link}
        className={containerStyles.bigLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {playlist.image && showImage && (
          <div
            className={containerStyles.posterWrapper}
            style={{ aspectRatio: type === "video" ? "4/3" : "1/1" }}
          >
            <img
              role="presentation"
              src={playlist.image}
              alt={`${playlist.title} thumbnail`}
              className={containerStyles.poster}
            />
          </div>
        )}

        <div className={containerStyles.details}>
          {playlist.subtitle && (
            <p className={containerStyles.source}>{playlist.subtitle}</p>
          )}
          <h3 className={containerStyles.title}>{playlist.title}</h3>
          <p>{playlist.timestamp}</p>
        </div>
      </a>
    </li>
  )
})

export default Playlist
