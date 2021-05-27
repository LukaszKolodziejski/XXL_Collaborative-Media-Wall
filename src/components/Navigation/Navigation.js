import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = (props) => {
  return (
    <header className={styles.Navigation}>
      <nav className={styles.DeskopOnly}>
        <ul className={styles.NavigationItems}>
          <NavigationItem link="/shared" exact>
            SHARED
          </NavigationItem>
          <NavigationItem link="/user1">
            {"My folder ( Łukasz )"}
          </NavigationItem>
          <NavigationItem link="/user2">{"Folder ( Elsie )"}</NavigationItem>
          <NavigationItem link="/user3">{"Folder ( Willie )"}</NavigationItem>
          <NavigationItem link="/user4">{"Folder ( Sheri )"}</NavigationItem>
        </ul>
        {/* <NavigationItems isAuth={props.isAuth} /> */}
      </nav>
      <div className={styles.Logout}>
        <NavLink to="/" exact>
          Logout
        </NavLink>
      </div>
    </header>
  );
};

export default Navigation;
