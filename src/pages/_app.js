import "@components/styles/globals.css"
import Layout from "../comps/layout"
import { store } from '../redux/stores'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}
