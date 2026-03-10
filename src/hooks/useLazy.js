import * as React from "react"

export const useLazy = items => {
  const imgRefs = React.useRef(
    new Map(items.map(i => [i.url, React.createRef()])),
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id
          imgRefs.current?.get(id)?.current?.showImage()
        }
      })
    })

    imgRefs.current?.forEach(ref => {
      if (ref.current != null) {
        observer.observe(ref.current.el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [imgRefs])

  return imgRefs
}
