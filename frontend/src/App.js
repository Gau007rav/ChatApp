import { Route} from "react-router-dom"
import "./App.css"
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
function App() {
  return (
    <div className="App">
     
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={ChatPage} />
   
    </div>
  );
}

export default App;
