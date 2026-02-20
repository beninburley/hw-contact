import "./App.css";
import { ContactEditor } from "./components/ContactEditor";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <ContactEditor />
    </ContactProvider>
  );
}

export default App;
