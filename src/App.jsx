import { useEffect, useRef, useState } from "react";

import "./App.css";
import RecentSearch from "./componants/RecentSearch";
import QuestionAnswer from "./componants/QuestionAnswer";

function App() {
  // const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
  const API_KEY = import.meta.env.VITE_API_KEY;
  
  //This is React Learning Project || We are making practice git..

  // const API = import.meta.env.API_KEY
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")),
  );
  //This is for search history code
  const [search_history, setSearchHistory] = useState("");
  //This is for scroll your answer
  const scrollToAnswer = useRef()
  // useEffect(() => {
  //   console.log(search_history);
  // }, [search_history]);

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const handle_question = async () => {
    //Suppose User Press Direct Enter Without Typing Any Question Then Below Code Executes..

    console.log(import.meta.env.VITE_DATA);
    
    if (!question && !search_history) {
      console.log("Warning... Please type some question..");

      return false;
    }
    

    // If Valid question is exist ? THen we have to store in localstorage..
    if (question) {
      // This is related From localStorage Part ...
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        localStorage.setItem("history", JSON.stringify([question, ...history]));
        setRecentHistory([question, ...history]);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    //************* */
    const payload_data = question ? question : search_history;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payload_data,
            },
          ],
        },
      ],
    };
    setLoading(true);
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();
      // console.log(response.candidates[0].content.parts[0].text);
      let response_data = response.candidates[0].content.parts[0].text;
      let arr_string = response_data.split("* ");
      arr_string = arr_string.map((str) => str.trim());

      // let arr = response_data.split(/\d+\.\s+/);

      // let new_arr = arr.map((item)=>item.split('*').join('').trim());
      // // console.log(new_arr);
      // arr = arr
      //   .map((item) => item.replace(/\n/g, " ").trim())
      //   .filter((item) => item.length > 0);

      console.log(arr_string);

      setAnswer([
        ...answer,
        { type: "q", text: question ? question : search_history },
        { type: "a", text: arr_string },
      ]);
      setLoading(false);
      setQuestion("");
      setTimeout(() => {
        scrollToAnswer.current.scrollTop = scrollToAnswer.current.scrollHeight;
      }, 500);
      // console.log(import.meta.env.VITE_MY_KEY);
      
    } catch (err) {
          

      console.log(err);
      setLoading(false);
      setQuestion('')
      // console.log(import.meta.env.VITE_MY_KEY);

    }
  };



  const isEnter = (event) => {
    if (event.key === "Enter") {
      handle_question();
    }
  };

  useEffect(() => {

    const call_myYunc = ()=>{
          if (search_history){
            handle_question();
          }
    }
    call_myYunc();
  }, [search_history]);

  //Dark Mode Theme Code
  const [darkMode,setDarkMode] = useState('dark');

  useEffect(()=>{
    console.log(darkMode);
    if (darkMode === 'dark'){
        document.documentElement.classList.add('dark')
    }else{
       document.documentElement.classList.remove('dark')
    }
    
  },[darkMode]);

  return (
    <>
    <div className=''>
        <div className="grid grid-cols-5 h-screen text-center">
          <select 
                className="fixed text-white bottom-0 p-2.5 bg-zinc-800"
                onChange={(event)=>setDarkMode(event.target.value)}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
          </select>

        <RecentSearch recentHistory = {recentHistory} setRecentHistory = {setRecentHistory} 
        setSearchHistory = {setSearchHistory}/>


          <div className="col-span-4">
            <div className="container h-130 overflow-y-auto p-10" ref={scrollToAnswer}>
              <h1 className="text-4xl bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-700 p-1">
                Hello User, Ask me Anything
              </h1>

              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-neutral-tertiary animate-spin fill-pink-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}

              <div className="text-zinc-300">
                {/* <ul>
                  {answer &&
                    answer.map((item, index) => (
                      <li key={index}>
                        <Answer answer={item} index={index} total_answers = {answer.length}/>
                      </li>
                    ))}
                </ul> */}
                <ul>
                  {answer &&
                    answer.map((item, index) => (
                    <QuestionAnswer key={index} item = {item} index = {index}/>
                    ))}
                </ul>
              </div>
            </div>

            <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border-zinc-700 border flex">
              <input
                type="text"
                placeholder="Ask me anything"
                className="w-full h-full p-3 outline-none"
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={isEnter}
                value={question}
              />
              <button onClick={handle_question}>Ask</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
