import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Card, CardImg } from "reactstrap";
import axios from "axios";
import * as yup from "yup";
import Form from "./components/Form";
import schema from "./validation/formSchema";

const initialFormValues = {
  name: "",
  size: "",
  sauce: "",
  pepperoni: false,
  sausage: false,
  peppers: false,
  onions: false,
  specialInstructions: "",
};

const initialErrorValues = {
  name: "",
  size: "",
  sauce: "",
};

export default function App() {
  const [pizza, setPizza] = useState([]);
  const [post, setPost] = useState();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrorValues);
  const [disabled, setDisabled] = useState(true);

  const updateForm = (name, value) => {
    validateInput(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const validateInput = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((error) => {
        setFormErrors({ ...formErrors, [name]: error.errors[0] });
      });
  };

  const submitForm = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      toppings: ["pepperoni", "cheese", "pineapple", "onions"].filter(
        (topping) => formValues[topping]
      ),
      specialInstructions: formValues.specialInstructions.trim(),
    };
    postPizza(newPizza);
  };

  useEffect(() => {
    schema
      .isValid(formValues)
      .then((valid) => {
        setDisabled(!valid);
      })
      .catch(() => {
        debugger;
      });
  }, [formValues]);

  const postPizza = (newPizza) => {
    axios
      .post("https://reqres.in/api/users", newPizza)
      .then((response) => {
        setPizza([...pizza, response.data]);
        setPost(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  return (
    <div>
      <nav>
        <h1>Lambda Eats</h1>
        <Link to="/">Home</Link>
        <Link to="/pizza">Pizza</Link>
        <Card style={{ height: "80%", margin: "0 auto" }}>
          <CardImg src={require("./Assets/Pizza.jpg")} />
        </Card>
      </nav>

      <Switch>
        <Route path="/pizza">
          <Form
            updateForm={updateForm}
            formValues={formValues}
            submitForm={submitForm}
            formErrors={formErrors}
            disabled={disabled}
          />
        </Route>

        <Route exact path="/">
          <div className="home">
            <h1>Home</h1>
            {post ? (
              <div className="order-summary">
                <h3>Congrats. Your order is on its way.</h3>
                <img
                  src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy.gif"
                  alt="Dog with Pizza"
                ></img>
                <h4>Order Summary:</h4>
                <pre style={{ overflow: "auto", width: "75%" }}>
                  {JSON.stringify(post)}
                </pre>
              </div>
            ) : null}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
