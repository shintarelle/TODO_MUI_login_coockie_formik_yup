import RouterMapping from './router/RouterMapping';
import { DialogProvider } from './contexts/DeleteDialogContext';

function App() {
  return (
    <DialogProvider>
      <RouterMapping />
    </DialogProvider>
  );
}

export default App;
