import React from "react";
import { Switch, Route } from "react-router-dom";

import { auth, addUserProfileDocument } from "../src/firebase/firebase.utils";

import Banner from "./pages/home-page/banner.component";
import "./App.css";
import ShopPage from "./pages/shop-page/shop-page";
import Navigation from "./components/navigation/navigation.component";
import SignIn from "./pages/sign-in-log-in/sign-in-log-in.page";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await addUserProfileDocument(user);

        userRef.onSnapshot((snapshot) => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Navigation isLoggedIn={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Banner}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/sign-in" component={SignIn}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
