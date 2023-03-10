import { Avatar, Grid, Rating, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";

type ReviewProp = {
  fname: string;
  lname: string;
  rating: number;
  review: string;
  createdAt: Date;
};

export default function Review(props: ReviewProp) {
  const date = new Date(props.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <>
      <Container sx={{ mt: 3, width: "90%" }}>
        <Grid container>
          <Grid item mr={2}>
            <Avatar
              alt={props.fname + " " + props.lname}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item md={11}>
            <Stack direction="column">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" color="initial" fontWeight={500}>
                  {props.fname + " " + props.lname}
                </Typography>
                <Typography variant="body1" color="initial">
                  {formattedDate}
                </Typography>
              </Stack>
              <Rating
                name="read-only size-small"
                value={props.rating}
                readOnly
                precision={0.5}
              />
            </Stack>
          </Grid>
          <Grid item mt={2}>
            {props.review}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
