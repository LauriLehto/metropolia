import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return<ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  >
    <Component {...pageProps} />
  </ThemeProvider>;
}

export default MyApp
