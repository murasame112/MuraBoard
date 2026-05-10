import MainContent from "./components/MainContent/MainContent";
import { LanguageProvider } from "./contexts/language/LanguageProvider";

function App() {

  return (
  <LanguageProvider>
		<MainContent/>
	</LanguageProvider>
  );
}

export default App
