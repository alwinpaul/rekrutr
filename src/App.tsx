import "./assets/scss/styleGuide.scss";

import Header from "./components/Header/Header";
import ValidateLogin from "./components/ValidateLogin/ValidateLogin";
import MainBody from "./views/MainBody/MainBody";

function App() {
  return (
    <div className="App">
      <ValidateLogin>
        <Header />
        <MainBody />
      </ValidateLogin>
    </div>
  );
}

export default App;
