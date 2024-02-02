import { useState, FC, ChangeEvent } from "react";
import "./App.css";
import InputField from "./component/Input";
import EstimatedValue from "./component/EstimatedValue";
import Button from "./component/Button";

interface Inputs {
  [key: string]: number;
}
interface descriptionList {
  [key: string]: string;
}
const descriptionList: descriptionList = {
  numberOfAgents: "Enter the number of agents",
  annualClosing: "Enter the annual closing amount",
  averageFee: "Enter the average fee per agent",
  annualExpenses: "Enter the annual expenses amount",
};

const App: FC = () => {
  const inputFields = [
    { label: "Number of Agents", id: "numberOfAgents", name: "numberOfAgents" },
    { label: "Annual Closings", id: "annualClosing", name: "annualClosing" },
    { label: "Average Trans. Fee", id: "averageFee", name: "averageFee" },
    { label: "Annual Expenses", id: "annualExpenses", name: "annualExpenses" },
  ];

  const [values, setValues] = useState<Inputs>({
    numberOfAgents: 0,
    annualClosing: 0,
    averageFee: 0,
    annualExpenses: 0,
  });
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("Select field for detail");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validate if the input is a number
    const isNumber = /^[0-9]*$/;
    if (isNumber.test(value) || value === "") {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value === "" ? 0 : Number(value),
      }));
    }
    setTotal(0);
  };

  const handleInputFocus = (label: string) => {
    setDescription(descriptionList[label]);
  };

  const handleInputBlur = () => {
    setDescription("Select field for detail");
  };

  const handleButtonClick = () => {
    const { numberOfAgents, annualClosing, averageFee, annualExpenses } =
      values;
    console.log(averageFee + annualClosing + numberOfAgents, annualExpenses);
    const total: number =
      (numberOfAgents * 1200 + annualClosing * averageFee - annualExpenses) *
      2.5; //2.5 is multipler
    setTotal(total);
  };

  // Check if any input is ero
  const isAnyInputInvalid = Object.values(values).some((value) => value === 0);

  return (
    <div>
      <p className="title">Valuation Calculator</p>
      <div className="container">
        <div>
          {inputFields.map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              id={field.id}
              name={field.name}
              value={values[field.name]}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus(field.id)}
              onBlur={handleInputBlur}
            />
          ))}
          <Button onClick={handleButtonClick} disabled={isAnyInputInvalid}>
            Calculate
          </Button>
          <EstimatedValue total={total} />
        </div>
        <div>
          <p>Description</p>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
