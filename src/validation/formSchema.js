//Import dependencies
import * as yup from "yup";

//Schema object
export default yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  size: yup
    .string()
    .oneOf(["small", "medium", "large"], "Please select a size"),
  sauce: yup
    .string()
    .oneOf(["Original", "BBQ", "Alfredo"], "Please select a sauce"),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  peppers: yup.boolean(),
  onions: yup.boolean(),
  specialInstructions: yup.string(),
});
