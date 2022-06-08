import * as React from "react"
import Search from "../components/search"

// TODO maybe hideableesearch
const MobileSearch = props => {
  const [showSearch, setShowSearch] = React.useState(false)

  // TODO aria-announce?
  const toggleSearch = () => setShowSearch(!showSearch)

  return showSearch ? (
    <Search
      {...props}
      extraActions={
        <button onClick={toggleSearch} className="buttonLink">
          hide search fields
        </button>
      }
    />
  ) : (
    <button onClick={toggleSearch}>show search fields</button>
  )
}

export default MobileSearch
