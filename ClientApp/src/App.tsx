import { BrowserRouter } from 'react-router-dom';
import Layout from './ui/components/Layout';
import { routes } from './config/routes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <>{routes}</>
      </Layout>
    </BrowserRouter>
  );
}

window.history.pushState(null, '', '/') // forget the backend route

export default App;
