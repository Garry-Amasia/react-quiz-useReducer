import { useEffect, useReducer } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import axios from "axios";
import Error from "./Error";
import Loader from "./Loader";
import { StartScreen } from "./StartScreen";
import { Questions } from "./Questions";

const initialState = {
  questions: [],
  //loading/error/ready/active/finished
  status: "loading",
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

    default:
      throw new Error("isnt one of the type");
  }
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  console.log(questions);
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
        {status === "active" && <Questions />}
      </Main>
    </div>
  );
}

export default App;
