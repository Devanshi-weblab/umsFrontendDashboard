import { Card, CardContent, Typography, Stack } from "@mui/material";

const TotalProgramsCard = ({ total }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: "#c7cdd6",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={500}>
            Total Programs
          </Typography>

          <Typography fontWeight={600}>
            {total}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TotalProgramsCard;
