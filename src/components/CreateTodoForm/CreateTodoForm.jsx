import React from 'react';
import { Formik, Form, Field } from 'formik';
import validationSchema from './createTodoValidSchema';
import { TextField as FormikTextField } from 'formik-mui';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';

const CreateTodoForm = ({ handleSubmit, formInitialValues, isLoading }) => {
  return (
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
            <LoadingButton
              variant="contained"
              disabled={isSubmitting}
              onClick={submitForm}
              fullWidth
              loading={isLoading}
              sx={{
                backgroundColor: '#87009d',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#f5e4f4',
                },
                '&:focus': {
                  backgroundColor: '#f5e4f4',
                },
              }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

CreateTodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formInitialValues: PropTypes.shape({
    title: PropTypes.string || '',
    description: PropTypes.string || '',
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default CreateTodoForm;
