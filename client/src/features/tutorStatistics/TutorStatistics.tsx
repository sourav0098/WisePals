import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "../../lib/axios";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Tutor Contact Statistics by Day of the Week for Current Week",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 0.2,
      },
    ],
  },
};
const TutorStatistics = () => {
  const [totalContacts, setTotalContacts] = useState<number>();
  const [contactStat, setContactStat] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/api/v1/contact/statistics/640745747471f3316bd0710e`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let sum = 0;

        const contactStatsByDayOfWeek = daysOfWeek.map((dayOfWeek) => {
          const count = res.data[dayOfWeek] || 0;
          sum = count + sum;
          return { day: dayOfWeek.toLowerCase(), contacts: count };
        });

        console.log(contactStatsByDayOfWeek);
        setContactStat(contactStatsByDayOfWeek);
        setTotalContacts(sum);
      });
  }, []);

  const courses = [
    {
      title: "Introduction to React",
      students: 50,
    },
    {
      title: "Advanced JavaScript",
      students: 30,
    },
    {
      title: "Introduction to Node.js",
      students: 40,
    },
  ];

  const students = courses.reduce(
    (total, course) => total + course.students,
    0
  );

  const avgRating = 4.5;

  const earnings = courses.reduce(
    (total, course) => total + course.students * 20,
    0
  );
  const data = {
    labels: contactStat.map((contact: any) => contact.day),
    datasets: [
      {
        label: "Students",
        data: contactStat.map((contact: any) => contact.contacts),
        backgroundColor: "rgba(0, 150, 255, 0.5)",
      },
    ],
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Paper sx={{ py: 5, px: 5 }}>
        <Typography variant="h5" component="h3">
          Tutor Statistics
        </Typography>
        <Typography component="p">
          Number of times Contacted: {totalContacts}{" "}
        </Typography>
        <Typography component="p">Students attending: {students}</Typography>
        <Typography component="p">
          Average student rating: {avgRating}
        </Typography>
        <Typography component="p">Total earnings: {earnings}</Typography>
        <Typography component="div" sx={{ py: 2, px: 20 }}>
          <Bar options={options} data={data} />
        </Typography>
      </Paper>
    </Container>
  );
};
export default TutorStatistics;
