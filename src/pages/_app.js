import "@components/styles/globals.css"
import Layout from "../comps/layout"


export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
