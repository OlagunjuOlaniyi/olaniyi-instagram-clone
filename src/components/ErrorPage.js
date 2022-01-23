import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Error>
      <h2>Sorry! The page you are looking does not exist...</h2>
      <a href="/">Back Home</a>
    </Error>
  );
};

export default ErrorPage;

const Error = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
