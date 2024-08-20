import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  manager: yup.string().required('Manager is required'),
  date_of_birth: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD')
    .test('is-valid-date', 'Invalid date', function (value) {
      if (!value) return false;
      const [year, month, day] = value.split('-').map(Number);

      if (month < 1 || month > 12) {
        return false;
      }

      const daysInMonth = new Date(year, month, 0).getDate();
      return !(day < 1 || day > daysInMonth);
    })
    .required('Date of birth is required'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Gender must be either male or female')
    .required('Gender is required'),
  status: yup
    .string()
    .oneOf(
      ['active', 'archive', 'pending'],
      'Status must be active, archive or pending',
    )
    .required('Status is required'),
});

export const managerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
});
