import { useState, useEffect } from "react";
import UserCard from "../features/userProfile/UserCard";
import { Box, Container } from "@mui/material";
import TutorCard from "../features/userProfile/TutorCard";
import axios from "../lib/axios";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state: any) => state.session);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [isLaoding, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/v1/user/byId/?id=${user.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setName(res.data.name);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setIsTutor(user.roles.includes(5777));
        setIsLoading(false);
      });
  }, []);
  if (isLaoding) {
    return <Container></Container>;
  } else {
    return (
      <Container>
        <Box my={5}>
          <UserCard
            name={name}
            lastName={lastName}
            email={email}
            phone={phone}
          />
        </Box>
        {isTutor ? (
          <Box my={5}>
            <TutorCard />
          </Box>
        ) : (
          <div></div>
        )}
      </Container>
    );
  }
};

export default UserProfile;
