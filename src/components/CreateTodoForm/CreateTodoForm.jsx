import React from 'react';
import { Formik, Form, Field } from 'formik';
import validationSchema from './validationSchema';
import { TextField as FormikTextField } from 'formik-mui';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const formInitialValues = {
  title: '',
  description: '',
};

const CreateTodoForm = ({ handleSubmit }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Todo
      </Typography>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit({ ...values });
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Box marginBottom={2}>
              <Field
                component={FormikTextField}
                name="title"
                type="text"
                label="title"
                fullWidth
              />
            </Box>
            <Box marginBottom={2}>
              <Field
                component={FormikTextField}
                name="description"
                type="text"
                label="Description"
                variant="outlined"
                multiline
                minRows={3}
                fullWidth
              />
            </Box>
            <Box marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

CreateTodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default CreateTodoForm;
