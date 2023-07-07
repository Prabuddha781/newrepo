
import { React,  useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import "./Home/Home.css"
import { Quiz } from "./Quiz/Quiz";
import { Results } from "./Results/Results";

function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [fetching, setFetching] = useState(false);

  const fetchQuestions = async (category = "", difficulty = "") => {
    setFetching(true);
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=5${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(JSON.parse(JSON.stringify(data.results)));
    setFetching(false);
  };

  return (
    <div>
      <h1 className="quiz-header-wrapper">Quiz Maker</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home fetchQuestions={fetchQuestions} />}
          ></Route>

          <Route
            path="/quiz"
            element={
              <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                fetching={fetching}
              />
            }
          ></Route>

          <Route path="/result" element={<Results />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
