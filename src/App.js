import "./App.css";
import MainRoute from "./MainRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from 'js-cookie';
export  function getXsrfToken() {
  return Cookies.get('XSRF-TOKEN');
}
function App() {
  
  return (
    <div className="App">
      <MainRoute />
    </div>
  );
}

export default App;