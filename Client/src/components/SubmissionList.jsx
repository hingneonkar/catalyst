import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../features/submissions/submissionSlice';

import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Box,
  Button,
} from '@mui/material';

export default function SubmissionList() {
  const dispatch = useDispatch();
  const { submissions, loading, error } = useSelector((state) => state.submissions);

  // Local state for filters
  const [topicFilter, setTopicFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');

  // Fetch all submissions initially (no filter)
  useEffect(() => {
    dispatch(getSubmissions());
  }, [dispatch]);

  // Filtered submissions based on topicFilter and scoreFilter locally
  // If you want to do filtering backend side, you can dispatch getSubmissions with filters on submit
  // But here, since we need the full list to get filter options, we filter locally
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const topicMatch = topicFilter ? sub.topic === topicFilter : true;
      const scoreMatch = scoreFilter ? sub.score >= Number(scoreFilter) : true;
      return topicMatch && scoreMatch;
    });
  }, [submissions, topicFilter, scoreFilter]);

  // Get unique topics dynamically from submissions
  const topicOptions = useMemo(() => {
    const topics = submissions.map((sub) => sub.topic);
    return Array.from(new Set(topics)).sort();
  }, [submissions]);

  // Get unique scores dynamically (sorted) from submissions
  const scoreOptions = useMemo(() => {
    const scores = submissions.map((sub) => sub.score);
    return Array.from(new Set(scores)).sort((a, b) => a - b);
  }, [submissions]);

  // Clear filters handler
  const clearFilters = () => {
    setTopicFilter('');
    setScoreFilter('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          🗂️ Admin Submissions
        </Typography>

        {/* Filters UI */}
        {loading ? null : (
          <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
            <TextField
              select
              label="Filter by Topic"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              {topicOptions.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Minimum Score"
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              {scoreOptions.map((score) => (
                <MenuItem key={score} value={score}>
                  {score}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="outlined" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Box>
        )}

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', my: 3 }} />
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
        ) : filteredSubmissions.length === 0 ? (
          <Alert severity="info" sx={{ my: 2 }}>No submissions available.</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Topic</strong></TableCell>
                  <TableCell><strong>Score</strong></TableCell>
                  <TableCell><strong>Feedback</strong></TableCell>
                  <TableCell><strong>Time</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubmissions.map((sub) => (
                  <TableRow key={sub._id}>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>{sub.topic}</TableCell>
                    <TableCell>{sub.score}</TableCell>
                    <TableCell>{sub.feedback}</TableCell>
                    <TableCell>{new Date(sub.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}
