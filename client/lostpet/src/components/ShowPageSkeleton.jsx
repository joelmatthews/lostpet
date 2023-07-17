import { Paper, Skeleton, Stack } from "@mui/material";

const ShowPageSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ padding: 6 }}>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={950} height={500} />
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={700} height={450} />
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={800} height={100} />
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={400} height={75} />
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={400} height={75} />
        <Skeleton animation="wave" sx={{ bgcolor: 'rgb(202, 202, 202)'}} variant="rectangular" width={400} height={75} />
      </Stack>
    </Paper>
  );
};

export default ShowPageSkeleton;
