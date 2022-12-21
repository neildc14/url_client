import React from "react";
import { Box, Container, Heading, Image, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import image from "../assets/images/undraw_link_shortener_mvf6.png";

const Home = () => {
  return (
    <Container maxW="500px" mx="auto">
      <Heading as="h1" mt={8} fontSize={{ base: "5xl", lg: "4xl" }}>
        when the shorter
      </Heading>
      <Image src={image} height={{ lg: "350px" }} />
      <Heading as="h2" fontSize={{ base: "5xl", lg: "4xl" }}>
        the better
      </Heading>
      <Button
        as={RouterLink}
        to="/create"
        mt={8}
        py={4}
        px={8}
        boxShadow="2xl"
        colorScheme="facebook"
        fontWeight="bold"
      >
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
