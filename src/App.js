import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import axios from "axios";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { StartScreen } from "./components/StartScreen";
import { Questions } from "./components/Questions";
import { NextButton } from "./components/NextButton";
import { Progress } from "./components/Progress";

const initialState = {
  questions: [],
  //loading/error/ready/active/fißnished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
      const currentQuestion = state.questions.data[state.index];
      // console.log(state);
      // console.log(currentQuestion.correctOption);
      const pointRewarded =
        currentQuestion.correctOption === payload
          ? state.points + currentQuestion.points
          : state.points;
      // console.log(pointRewarded);
      return { ...state, answer: payload, points: pointRewarded };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("isnt one of the type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points } = state;

  // console.log(questions);
  const numberOfQuestions = questions.data?.length;
  const maxAmountOfPoints = questions?.data?.reduce(
    (previous, current) => previous + current.points,
    0
  );

  console.log(answer);

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

  // console.log(state);

  // console.log(state);
  // console.log(state);
  // console.log("App Components");
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
          <>
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              points={points}
              maxAmountOfPoints={maxAmountOfPoints}
            />
            <Questions
              question={questions.data[index]}
              dispatch={dispatch}
              answer={answer}
            />
            {/* {answer && <NextButton dispatch={dispatch} />} */}
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
