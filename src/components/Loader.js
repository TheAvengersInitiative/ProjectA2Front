import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/AuthContext";

const LoaderBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.89);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  z-index: 10000;
`;

export const Loader = () => {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <LoaderBackground>
          <LoadingImage src="https://www.ign.gob.ar/geodesiaapp/ntrip-registro/img/loader.gif" />
        </LoaderBackground>
      ) : (
        <> </>
      )}
    </>
  );
};
