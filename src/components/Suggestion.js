import React from "react";
import "./Suggestion.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { data } from "../data";

const Suggestion = () => {
  return (
    <div className="suggestion__container">
      <div className="suggestion__main">
        <div className="suggestion__mainInfo">
          <Avatar
            className="post__avatar"
            alt="{username}"
            src="/assets/avatar.png"
          />
          <div className="suggestion__mainInfoDetail">
            <h3>username</h3>
            <p>Olagunju Salaudeen Olaniyi</p>
          </div>
        </div>
        <Button className="suggestion__mainInfoBtn">switch</Button>
      </div>

      <div className="suggestion__forYou">
        <p>Suggestions for you</p>
        <Button>see all</Button>
      </div>

      {data.map((info) => {
        const { id, username, text, avatar } = info;
        return (
          <div className="suggestion__main suggestion__others" key={id}>
            <div className="suggestion__mainInfo">
              <Avatar
                className="suggestion__avatar"
                alt={username}
                src={avatar}
              />
              <div className="suggestion__mainInfoDetail">
                <h3>{username}</h3>
                <p>{text}</p>
              </div>
            </div>
            <Button className="suggestion__mainInfoBtn">follow</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggestion;
