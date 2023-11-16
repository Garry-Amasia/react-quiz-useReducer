import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import axios from "axios";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { StartScreen } from "./components/StartScreen";
import { Questions } from "./components/Questions";

const initialState = {
  questions: [],
  //loading/error/ready/active/fißnished
  status: "loading",
  index: 0,
  answer: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "dataIsReady" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: payload };
    default:
      throw new Error("isnt one of the type");
  }
};

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // console.log("rendering");

  // console.log(questions);
  const numberOfQuestions = questions.data?.length;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8000/questions`)
        .then((data) => {
          // console.log(data);
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch((error) => {
          dispatch({ type: "dataFailed" });
        });
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:8000/questions`)
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((error) => dispatch({ type: "dataFailed" }));
  // }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {/* <p>{state.questions.data[0].question}</p> */}
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "dataIsReady" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <Questions
            question={questions.data[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
