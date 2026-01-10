import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

const StatusCard = ({ status, count, percentage, color }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: color,
        borderRadius: 2,
        minWidth: 10,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">


          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: color
              }}
            />
            <Typography fontWeight={500}>
              {status}
            </Typography>
          </Stack>


          <Stack alignItems="flex-end">
            <Typography fontWeight={600}>
              {count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {percentage}%
            </Typography>
          </Stack>

        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatusCard;