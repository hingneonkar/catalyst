import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { submitSynopsis  , reset } from '../features/submissions/submissionSlice';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Paper,
  Alert
} from '@mui/material';

export default function SubmissionForm() {
  const dispatch = useDispatch();
  const { response, loading, error , reset } = useSelector((state) => state.submissions);

  const formik = useFormik({
    initialValues: { name: '', email: '', synopsis: '', topic: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      synopsis: Yup.string().min(100, 'Synopsis must be at least 100 words').required('Synopsis is required'),
      topic: Yup.string().required('Topic is required')
    }),
    onSubmit: (values, { resetForm }) => {
    
      dispatch(submitSynopsis(values));
      resetForm();
      dispatch(reset())
    }
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          📚 Submit Your Reading Synopsis
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Topic / Title"
            name="topic"
            value={formik.values.topic}
            onChange={formik.handleChange}
            error={formik.touched.topic && Boolean(formik.errors.topic)}
            helperText={formik.touched.topic && formik.errors.topic}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Synopsis"
            name="synopsis"
            multiline
            rows={6}
            value={formik.values.synopsis}
            onChange={formik.handleChange}
            error={formik.touched.synopsis && Boolean(formik.errors.synopsis)}
            helperText={formik.touched.synopsis && formik.errors.synopsis}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ width: '200px' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </Box>
        </form>

        {/* Response Messages */}
        {response && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <strong>Score:</strong> {response.score} <br />
            <strong>Feedback:</strong> {response.feedback}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
