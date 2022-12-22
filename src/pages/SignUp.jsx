import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  FormErrorMessage,
  useInterval,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../services/makeHTTPRequest";
import useInput from "../hooks/useInput";

const SignUp = () => {
  const [usernameValue, usernameBind] = useInput("");
  const [emailValue, emailBind] = useInput("");
  const [passwordValue, passwordBind] = useInput("");
  const [confirmPasswordValue, confirmPasswordBind] = useInput("");
  const [matched, setMatched] = useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    passwordRef.current.addEventListener("keydown", () => {
      setMatched(false);
    });
    confirmPasswordRef.current.addEventListener("keydown", () => {
      setMatched(false);
    });
  }, []);

  const signUpUser = useMutation({
    mutationFn: postRequest,
    onSuccess: (response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/create";
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const authError = signUpUser.error?.response.data.error;

  const signUpUserFunction = (e) => {
    e.preventDefault();
    if (passwordValue.localeCompare(confirmPasswordValue) !== 0) {
      setMatched(true);
      return;
    }
    signUpUser.mutate({
      url: "au/signup",
      body: {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      },
    });
  };

  return (
    <Container maxW="5xl">
      <Box
        as="form"
        mt={{ base: "20%", md: "20%", lg: "5%" }}
        maxW="400px"
        mx="auto"
        onSubmit={signUpUserFunction}
      >
        <FormControl mb={4}>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...usernameBind} />
        </FormControl>
        <FormControl mb={4} isInvalid={authError}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...emailBind} />
          {authError && <FormErrorMessage>{authError}</FormErrorMessage>}
        </FormControl>
        <FormControl mb={4} isInvalid={matched}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...passwordBind} ref={passwordRef} />
          {matched && (
            <FormErrorMessage>Password did not matched.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={10} isInvalid={matched}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            {...confirmPasswordBind}
            ref={confirmPasswordRef}
          />
          {matched && (
            <FormErrorMessage>Password did not matched.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb={4}>
          <Button
            display="inline-block"
            w="100%"
            type="submit"
            colorScheme="green"
          >
            Sign up account
          </Button>
        </FormControl>
        <Text>
          Already have signed up?
          <Link as={RouterLink} to="/login" ps={2} textDecoration="underline">
            Login
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default SignUp;
