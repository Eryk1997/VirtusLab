import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import NotFoundPage from "./Views/NotFoundPage/NotFoundPage";
import AllPeople from "./Views/AllPeople/AllPeople";
import PeopleInfo from "./Views/MorInfo/PeopleInfo";

function App() {
  return (
    <div className="App bg-dark">
      <Navbar />
      <Switch>
        <Route exact path="/" component={AllPeople} />
        <Route path="/peopleInfo" component={PeopleInfo} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
