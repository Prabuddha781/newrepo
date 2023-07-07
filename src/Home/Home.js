import React, { useState } from "react";
import { Form } from "antd";
import "./Home.css";
import Categories from "../Data/Categories";
import { useNavigate } from "react-router-dom";
//import { unstable_HistoryRouter } from "react-router-dom"
export const Home = (props) => {
  // const [data, setData] = useState([]);
  const [category, setCat] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [error, setError] = useState(false);

  const difficulty_list = ["easy", "medium", "hard"];

  const navigate = useNavigate();

  //const history = unstable_HistoryRouter ()

  const handleSubmit = () => {
    if (!category || !difficulty) {
      setError(true);
      return;
    } else {
      setError(false);
      props.fetchQuestions(category, difficulty);
      navigate("/quiz");
      //history.push('/quiz')
    }
  };
  return (
    <div>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Form.Item label="Difficulty">
          <select
            id="difficultySelect"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            {difficulty_list.map((item) => {
              return (
                <option placeholder="easy" key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.substring(1)}
                </option>
              );
            })}
          </select>
        </Form.Item>
        <Form.Item label="Category">
          <select
            id="categorySelect"
            value={category}
            onChange={(e) => setCat(e.target.value)}
            className="form-select "
            aria-label="Default select example"
          >
            {Categories.map((level, idx) => {
              return (
                <option
                  value={level.value}
                  placeholder="General knowledge"
                  key={idx}
                >
                  {level.category}
                </option>
              );
            })}
          </select>
        </Form.Item>
      </Form>
      <div>
        <button
          id="createBtn"
          className=" btn btn-primary"
          size="small"
          onClick={handleSubmit}
          variant="contained"
          type="submit"
        >
          Create
        </button>
      </div>
    </div>
  );
};
