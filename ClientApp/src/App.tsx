import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
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

export default App;
