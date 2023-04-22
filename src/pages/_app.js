import "@components/styles/globals.css"
import Layout from "../comps/Layout"

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
