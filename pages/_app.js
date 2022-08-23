import '../styles/globals.css'
import { Suspense } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={null}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default MyApp
