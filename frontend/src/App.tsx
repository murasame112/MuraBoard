import { LanguageProvider } from "./contexts/language/LanguageProvider";
import MainLayout from "./layouts/main-layout/MainLayout/MainLayout";

function App() {

  return (
  <LanguageProvider>
		<MainLayout/>
	</LanguageProvider>
  );
}

export default App
