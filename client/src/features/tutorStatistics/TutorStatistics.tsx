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
};
const TutorStatistics = () => {
  const [totalContacts, setTotalContacts] = useState<number>();
  const [contactStat, setContactStat] = useState<any>([]);
  const [skills, setSkills] = useState<any>();
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
          const count = res.data.contactsByDayOfWeek[dayOfWeek] || 0;
          sum = count + sum;
          return { day: dayOfWeek.toLowerCase(), contacts: count };
        });

        setContactStat(contactStatsByDayOfWeek);
        setTotalContacts(sum);
        setSkills(res.data.skills);
      });
  }, []);

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
        <Typography component="p">
          Skills for which the tutor was contacted this week:
        </Typography>

        <Typography component="div" sx={{ px: 5 }}>
          {skills && skills.length > 0 ? (
            <ul>
              {skills.map((skill: string) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills found.</p>
          )}
        </Typography>

        <Typography component="div" sx={{ py: 2, px: 20 }}>
          <Bar options={options} data={data} />
        </Typography>
      </Paper>
    </Container>
  );
};
export default TutorStatistics;
