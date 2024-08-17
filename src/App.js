import { useEffect, useState } from "react";
import { fetchPosts } from "./requests/request";
import { getRandomElements } from "./helpers/getRandomQuestions";
import Card from "./components/Card";
import Header from "./components/Header";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      const questions = getRandomElements(data, 10);
      const processedData = questions.map((item, index) => {
        const answers = item.body.split('\n');
        return {
          userId: item.userId,
          id: item.id,
          title: `Q${index + 1}: ${item.title}`,
          answers: answers
        };
      });
      setPosts(processedData);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          if (currentQuestionIndex < posts.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(prev => [...prev, selectedAnswer]);
            setSelectedAnswer(null);
            return 30; // Reset timer for next question
          } else {
            setShowSummary(true);
            clearInterval(interval);
          }
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, posts, selectedAnswer]);

  const handleAnswerClick = (index) => {
    if (timer <= 20) { // Disable selection in the first 10 seconds
      setSelectedAnswer(index);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < posts.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(prev => [...prev, selectedAnswer]);
      setTimer(30);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-400 text-white flex flex-col items-center justify-center">
      <Header timer={timer} currentQuestion={currentQuestionIndex + 1} />
      {posts.length > 0 && !showSummary && (
        <Card
          question={posts[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswerClick={handleAnswerClick}
        />
      )}
      {showSummary && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6">Summary</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Question</th>
                <th className="p-2">Selected Answer</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((question, index) => (
                <tr key={index}>
                  <td className="p-2">Q{index + 1}</td>
                  <td className="p-2">{selectedAnswer[index] !== undefined ? `Option ${['A', 'B', 'C', 'D'][selectedAnswer[index]]}` : 'Not answered'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!showSummary && (
        <button
          onClick={handleNextQuestion}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
          {currentQuestionIndex < posts.length - 1 ? 'Next Question' : 'Finish Test'}
        </button>
      )}
    </div>
  );
}

export default App;