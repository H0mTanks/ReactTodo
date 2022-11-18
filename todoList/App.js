import { GlobalProvider } from './GlobalContext';
import { Router } from './Router';

export default function App() {

  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}


