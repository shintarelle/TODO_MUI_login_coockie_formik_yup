import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(5, 'title must be at least 5 characters or more')
    .required('Required'),
  description: Yup.string()
    .trim()
    .min(10, 'description must be at least 10 characters')
    .required('Required'),
});
export default validationSchema;
