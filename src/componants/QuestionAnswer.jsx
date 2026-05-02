import Answer from "./Answers";
const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      <div
        key={index}
        className={`flex flex-col p-1 ${item.type === "q" ? "items-end" : "items-start"}`}
      >
        {item.type === "q" ? (
          <li
            key={index}
            className="text-right border-8 border-zinc-700 p-1 bg-zinc-700
                    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl w-fit"
          >
            <Answer
              answer={item.text}
              index={index}
              total_answers={1}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((answerItem, answerIndex) => (
            <li key={answerIndex}>
              <Answer
                answer={answerItem}
                index={answerIndex}
                total_answers={item.text.length}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
