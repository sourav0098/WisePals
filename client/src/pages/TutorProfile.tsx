import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import Review from "../features/reviews/components/Review";
import { useTheme } from "@mui/material/styles";
import { getTutorProfile } from "../features/showTutorProfile/store/tutorProfileSlice";
import { getReviews, addReview } from "../features/reviews/store/reviewSlice";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

export default function TutorProfile() {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const user = useSelector((state: any) => state.session);
  const tutor = useSelector(
    (state: any) => state.tutorProfileSlice.tutorProfile
  );
  const reviews = useSelector((state: any) => state.reviewSlice.reviews);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getTutorProfile(id));
  }, [dispatch,id]);
  
  useEffect(() => {
    if (tutor) {
      dispatch(getReviews(tutor._id));
    }
  }, [dispatch,tutor]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({
    review: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Validate Form Function
  const validateForm = () => {
    const errors: any = {
      review: false,
    };

    if (review === "") {
      errors.review = true;
    }
    return errors;
  };

  // Calculate average rating
  let avgRating = 0;
  if (reviews) {
    const totalRating = reviews.reviews.reduce(
      (acc: any, review: any) => acc + review.rating,
      0
    );
    avgRating = totalRating / reviews.numReviews;
  }

  const handleReviewChange = (e: any) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = () => {
    const errors = validateForm();
    if (errors.review === true) {
      setErrors(errors);
      
    } else {
      // Submit Review
      const reviewData = {
        tutorId: tutor._id,
        userId: user.id,
        rating: rating,
        review: review,
      };
      dispatch(addReview(reviewData))
      .then(() => {
        dispatch(getReviews(tutor._id));
      })
      setOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Review added successfully',
        showConfirmButton: false,
        timer: 2000
      })
    }
  };
  if (!tutor) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {/* Add Rating Dialog Box */}
        <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
          <DialogTitle>Add a Review</DialogTitle>
          <DialogContent>
            <input name="rating" type="number" value={rating} hidden readOnly />
            <Rating
              name="simple-controlled"
              value={rating}
              precision={0.5}
              onChange={(_, value) => {
                setRating(value);
              }}
            />
            <TextField
              error={errors.review}
              autoFocus
              margin="dense"
              id="review"
              label="Review"
              name="review"
              type="text"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              onChange={handleReviewChange}
              helperText={errors.review ? "Please enter a review" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleReviewSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item md={4}>
              {/* Avatar Image */}
              <Avatar
                alt="Remy Sharp"
                src={`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.IMAGES}${tutor.image}`}
                sx={{ width: 200, height: 200 }}
              />
            </Grid>
            {/* Profile Information */}
            <Grid item md={8}>
              <Typography
                variant="caption"
                sx={{ color: "gray", fontWeight: 500 }}
              >
                INSTRUCTOR
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography
                  sx={{ fontWeight: 500 }}
                  variant="h4"
                  component="h4"
                >
                  {tutor.fname + " " + tutor.lname}
                    <EmailIcon sx={{ color: "gray", ml: 1, cursor:"pointer" }} onClick={()=>{navigate("/contactTutor/"+tutor._id)}} />
                </Typography>
              </Stack>
              <Rating
                sx={{ mb: 1 }}
                precision={0.5}
                name="size-medium read-only"
                value={Number(avgRating.toFixed(1))}
                readOnly
              />
              <Typography variant="body1" component="h6">
                Skills:{" "}
                {tutor.skills.length > 0 ? tutor.skills.join(", ") : "None"}
              </Typography>
              <Typography variant="body1" component="h6">
                Knows{" "}
                {tutor.spokenLanguages.length > 0
                  ? tutor.spokenLanguages.join(", ")
                  : "no languages"}
              </Typography>
              <Typography variant="body1" component="h2">
                Cost: {tutor.currency} ${tutor.hourlyRate}  /hr
              </Typography>
              <Typography variant="body1" component="h2">
                Number of classes given: {tutor.classesGiven}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h4" sx={{ fontWeight: 500 }} color="initial">
                About Me
              </Typography>
              <Typography variant="body1" color="initial">
                {tutor.description}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3, mb: 2 }} />

          {/* Reviews Container */}
          {reviews && reviews.reviews.length > 0 ? (
            <Grid container>
              <Grid item md={12}>
                <Stack direction="row" alignItems="center">
                  <StarIcon sx={{ color: "#faaf00" }} />
                  <Typography ml={1} variant="h6" color="initial">
                    {avgRating.toFixed(1)} tutor rating | {reviews.numReviews}{" "}
                    {reviews.numReviews === 1 || 0 ? "review" : "reviews"}
                  </Typography>
                </Stack>
              </Grid>

              {/* Add a Review Component */}
              {/* User is logged in show add a review button */}
              {user.id!="" && <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleClickOpen}
              >
                Add a Review
              </Button>} 
              {/* Show please login to add a review */}
              {
                user.id==="" && 
                <Typography variant="body1" color="#1976d2" fontWeight={500}>Please login to add a review</Typography>
              }

              {/* Review Component */}
              {reviews &&
                reviews.reviews.map((r: any) => {
                  return (
                    <Review
                      key={r.id}
                      fname={r.userId.name}
                      lname={r.userId.lastName}
                      review={r.review}
                      rating={r.rating}
                      createdAt={r.createdAt}
                    />
                  );
                })}
            </Grid>
          ):
          (
            <Grid item md={8}>
              <Typography variant="h5" color="initial" fontWeight={500}>
                No Reviews Found!
              </Typography>
              {/* User is logged in show add a review button */}
              {user.id!="" && <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={handleClickOpen}
              >
                Add a Review
              </Button>} 
              {/* Show please login to add a review */}
              {
                user.id==="" && 
                <Typography variant="body1" color="#1976d2" fontWeight={500}>Please login to add a review</Typography>
              }
            </Grid>
          )}
        </Container>
      </>
    );
  }
}
