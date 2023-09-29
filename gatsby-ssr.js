import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="bevan"
      rel="preload"
      href="/fonts/Bevan-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="pontanosans-light"
      rel="preload"
      href="/fonts/PontanoSans-Light.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
      key="pontanosans-medium"
      rel="preload"
      href="/fonts/PontanoSans-Medium.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
  ])
}
