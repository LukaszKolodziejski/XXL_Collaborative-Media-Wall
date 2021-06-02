import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import SharedData from "./containers/SharedData/SharedData";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";

const App = () => {
  const users = ["Łukasz", "Elsie", "Willie", "Sheri"];

  return (
    <Router>
      <Layout>
        <Route path="/shared" exact component={SharedData} />
      </Layout>
    </Router>
  );
};

export default App;
