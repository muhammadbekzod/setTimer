import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Main, Title } from "./TimerStyle";

function timeListInfo() {
  const timeListText = [];
  for (let i = 0; i < timeListText.length; i++) {
    timeListText.push({
      id: i,
      text: "Timer: " + (i + 1),
    });
  }

  return timeListText;
}

export default function TimerComp() {
  const [startTime, setStartTime] = useState(null);
  const [liveTime, setLiveTime] = useState(null);
  const [todoList, setTodoList] = useState(timeListInfo());
  const [text, setText] = useState("");

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    handleStart();
    return () => clearInterval(secondSetting.current);
  }, []);

  const handleStart = () => {
    clearInterval(secondSetting.current);
    const startTime = Date.now();
    setStartTime(startTime);

    secondSetting.current = setInterval(() => {
      setLiveTime(Date.now());
    }, 10);
  };

  const secondSetting = useRef();

  const handlePause = () => {
    clearInterval(secondSetting.current);
  };

  const handleReset = () => {
    clearInterval(secondSetting.current);
    setStartTime(Date.now());
    secondSetting.current = setInterval(() => {
      setLiveTime(Date.now());
    }, 10);
  };

  let timeShow = 0;

  if (startTime != null && liveTime != null) {
    timeShow = (liveTime - startTime) / 1000;
  }

  return (
    <Main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
        }}
      >
        <Title>
          <h1>
            Timer:{" "}
            <div style={{ marginLeft: "30px", color: "#00FFFF" }}>
              {timeShow}
            </div>
          </h1>
        </Title>
        <div className="Buttonwrap">
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handlePause}>Pause</Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button
            onClick={() => {
              setText("");
              setTodoList([
                {
                  id: todoList.length,
                  text: "Result: " + timeShow.toFixed(2),
                },
                ...todoList,
              ]);
            }}
          >
            Add
          </Button>
        </div>
        <div className="resultWrapper" style={{}}>
          <h2>Results:</h2>
          {todoList.map((item) => (
            <div
              style={{
                padding: "7px 0",
                display: "flex",
                justifyContent: "space-between",
                color: "#778899",
                alignItems: "center",
              }}
              key={item.id}
            >
              {item.text}
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  paddingRight: "10px",
                }}
              >
                <FaTrashAlt
                  style={{
                    color: "darkgrey",
                    fontSize: "17px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteTodo(item.id)}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
}
