import type { AppProps } from 'next/app'

/** Global css */
import '../styles/globals.css'

/** dependency styles */
import '../public/css/style.css'


// This default export is required in a new `pages/_app.js` file.
export const Main = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
  )
}

export default Main
