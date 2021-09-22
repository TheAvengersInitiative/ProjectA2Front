import React, { useEffect, useState} from "react";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useParams } from "react-router-dom";
import { verifyEmail } from "../utils/Projects";
import { Container, LinearProgress } from "@material-ui/core";


function VerifyEmail() {

  const [hasError, setHasError] = useState(false);

  let { token } = useParams();

  let { user } = useParams();

  const confirmEmail = async () => {
    try {
      await verifyEmail(user, token);
      window.location.replace("/");
    } catch (e) {
      setHasError(true);
    }
  }; 

 useEffect(() => {
    confirmEmail();
  }, []);

  return (
      <Container>
         { hasError ? 
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            You need to confirm your email <strong>check it out!</strong>
        </Alert>
        : 
        <LinearProgress />
         }
      </Container>
       
    
        
  );
}

export default VerifyEmail;
