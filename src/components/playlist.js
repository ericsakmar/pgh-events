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

const withLink = (link, content) =>
  link ? <a href={link}>{content}</a> : content

const Playlist = ({ playlist }) => {
  const link = useLink(playlist.url)

  return (
    <div className={containerStyles.event}>
      {playlist.image &&
        withLink(
          link,
          <img
            src={playlist.image}
            alt="event poster"
            loading="lazy"
            className={containerStyles.poster}
          />
        )}

      <div className={containerStyles.details}>
        <h3>{withLink(link, playlist.title)}</h3>
        <p>{playlist.subtitle}</p>
        <p>{playlist.timestamp}</p>
        <p className={containerStyles.tags}>{playlist.tags.join(", ")}</p>
      </div>
    </div>
  )
}

export default Playlist
