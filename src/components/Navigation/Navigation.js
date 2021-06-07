import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = (props) => {
  const users = ["Łukasz", "Elsie", "Willie", "Sheri"];
  return (
    <header className={styles.Navigation}>
      <nav className={styles.DeskopOnly}>
        <ul className={styles.NavigationItems}>
          <NavigationItem link="/folder-shared" exact>
            SHARED
          </NavigationItem>
          {users.map((user) => {
            return (
              <NavigationItem key={user} link={`/folder-${user}`}>
                {`${user === users[0] ? "My folder" : "Folder"} ( ${user} )`}
              </NavigationItem>
            );
          })}
        </ul>
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
