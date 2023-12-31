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
import { FinishScreen } from "./components/FinishScreen";
import { Timer } from "./components/Timer";
import { Footer } from "./components/Footer";

const initialState = {
  questions: [],
  //loading/error/ready/active/fißnished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 30;

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload, status: "dataIsReady" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.data.length * SECONDS_PER_QUESTION,
      };
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
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      console.log(state.questions);
      console.log(state.questions.data);
      return {
        ...initialState,
        questions: state.questions,
        status: "dataIsReady",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("isnt one of the type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  // console.log(questions);
  const numberOfQuestions = questions.data?.length;
  const maxAmountOfPoints = questions?.data?.reduce(
    (previous, current) => previous + current.points,
    0
  );
  // console.log(state);

  // console.log(answer);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8000/questions`)
        .then((data) => {
          console.log(data);
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch((error) => {
          dispatch({ type: "dataFailed" });
        });
    };
    fetchData();
  }, []);

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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxAmountOfPoints={maxAmountOfPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
