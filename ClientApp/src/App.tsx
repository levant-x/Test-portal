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

window.history.pushState(null, '', '/')
const token = document.getElementById('__token')

export default App;
