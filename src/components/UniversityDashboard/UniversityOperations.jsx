import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import UniversitySelector from "./UniversitySelector";
import UniversityToggle from "./UniversityToggle";
import NavigationBar from "../NavigationBar/NavigationBar";
import UniversityList from "./UniversityList";
import StatusCard from "./StatusCards";
import API from "../../api/api";
import TotalProgramsCard from "./TotalProgramsCard";


const UniversityOperations = () => {
  const [tab, setTab] = useState("overview");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);

        const response = await API.get("/programs/overview", {
          params: {
            university: selectedUniversity || undefined,
          },
        });

        const data = response.data?.data || response.data;

        const counts = {
          completed: 0,
          delayed: 0,
          onTrack: 0,
          atRisk: 0,
          unassigned: 0,
        };

        data.stats?.forEach((item) => {
          if (!item.status) {
            counts.unassigned += item.count;
            return;
          }

          switch (item.status) {
            case "Completed":
              counts.completed = item.count;
              break;
            case "Delayed":
              counts.delayed = item.count;
              break;
            case "On Track":
              counts.onTrack = item.count;
              break;
            case "At Risk":
              counts.atRisk = item.count;
              break;
            default:
              break;
          }
        });

        setOverviewData({ ...data, counts });
      } catch (error) {
        console.error(
          "Failed to fetch overview data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [tab, selectedUniversity]);

  useEffect(() => {
    if (tab === "overview") {
      setSelectedUniversity("");
    }
  }, [tab]);



  if (loading && tab === "overview") {
    return <Typography sx={{ p: 3 }}>Loading overview...</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12} display="flex" justifyContent="flex-start">
        <NavigationBar />
      </Grid>

      <Grid size={12} display="flex" justifyContent="flex-start">
        <UniversityToggle tab={tab} onTabChange={setTab} />
      </Grid>

      <Grid xs={12}>
        {tab === "overview" ? (
          <Card sx={{ maxWidth: 1500 }}>
            <CardContent>
              <Grid container spacing={2}>

                <Grid size={8}>
                  <Typography gutterBottom variant="h5">
                    University Status Overview
                  </Typography>

                  <PieChart
                    series={[
                      {
                        data: [
                          { id: "atRisk", value: overviewData?.counts?.atRisk ?? 0, label: "At Risk", color: "#fb8c00" },
                          { id: "onTrack", value: overviewData?.counts?.onTrack ?? 0, label: "On Track", color: "#1976d2" },
                          { id: "delayed", value: overviewData?.counts?.delayed ?? 0, label: "Delayed", color: "#e53935" },
                          { id: "completed", value: overviewData?.counts?.completed ?? 0, label: "Completed", color: "#2ecc71" },
                        ],
                        innerRadius: 0,
                        outerRadius: 100,
                        paddingAngle: 0,
                        cornerRadius: 0,
                      },
                    ]}
                    width={500}
                    height={350}
                    slotProps={{
                      legend: {
                        position: { vertical: "bottom", horizontal: "middle" },
                        direction: "row",
                        padding: 10,
                      },
                    }}
                  />

                </Grid>


                <Grid size={4}>
                  <Stack spacing={2}>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        backgroundColor: "#f5f6f8",
                        borderRadius: 3,
                        padding: "6px 12px",
                        width: "700px",
                      }}
                    >
                      <AccountBalanceOutlinedIcon
                        sx={{ color: "#6b7280", fontSize: 22 }}
                      />

                      <UniversitySelector
                        value={selectedUniversity}
                        onChange={(e) =>
                          setSelectedUniversity(e.target.value)
                        }
                      />
                    </Box>

                    <Typography sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6b7280",   
                      textAlign: "left",
                      letterSpacing: "0.3px",
                    }}>
                      Status of Issues/Challenges
                    </Typography>

                    {/* TOTAL PROGRAMS */}
                    <TotalProgramsCard
                      total={overviewData?.total ?? 0}
                    />

                    <StatusCard
                      status="Completed"
                      count={overviewData?.counts?.completed ?? 0}
                      percentage={
                        overviewData?.stats?.find(s => s.status === "Completed")?.percentage ?? 0
                      }
                      color="#2ecc71"
                    />

                    <StatusCard
                      status="On Track"
                      count={overviewData?.counts?.onTrack ?? 0}
                      percentage={
                        overviewData?.stats?.find(s => s.status === "On Track")?.percentage ?? 0
                      }
                      color="#2979ff"
                    />

                    <StatusCard
                      status="Delayed"
                      count={overviewData?.counts?.delayed ?? 0}
                      percentage={
                        overviewData?.stats?.find(s => s.status === "Delayed")?.percentage ?? 0
                      }
                      color="#e53935"
                    />

                    <StatusCard
                      status="At Risk"
                      count={overviewData?.counts?.atRisk ?? 0}
                      percentage={
                        overviewData?.stats?.find(s => s.status === "At Risk")?.percentage ?? 0
                      }
                      color="#fb8c00"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <UniversityList />
        )}
      </Grid>
    </Grid>
  );
};

export default UniversityOperations;
