import { useEffect, useState } from "react";
import check_double_star from "../logic_handler";
import { replace_stars } from "../logic_handler";

// import {check_double_star} from '../logic_handler'
const Answer = ({ answer, index , total_answers, type}) => {
  const [heading, setHeading] = useState(false);
  const [modify_answer, setModifyAnswer] = useState(answer);
  console.log(index);

  useEffect(() => {
    // console.log(answer,check_double_star(answer));

    const show_data = () => {
      if (check_double_star(answer)) {
        setHeading(true);
        setModifyAnswer(replace_stars(answer));
      }
    };
    show_data();
  }, []);
  return (
    <>
      <div>
        {index === 0  && total_answers > 1 ? (
          <p 
          className="pt-2 text-1px font-semibold text-white bg-linear-to-r from-purple-950 to-green-700 px-3 py-2 rounded-lg">
            {modify_answer}
          </p>
        ) : heading ? (
          <p className="p-2 text-base text-zinc-300 border border-zinc-800 rounded-lg bg-linear-to-r from-zinc-700 to-indigo-900/30 my-1">{modify_answer}</p>
        ) : (
          <p className={`${type === 'q' ? 'p-1' : 'p-2 text-base text-zinc-300 border border-zinc-800 rounded-lg bg-linear-to-r from-purple-900/30 to-indigo-900/30 my-1'}`}>{modify_answer}</p>
        )}
      </div>
    </>
  );
};

export default Answer;

// ** This is star tesing string *
