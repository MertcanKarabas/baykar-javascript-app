import React from "react";

const Card = ({ question, selectedAnswer, onAnswerClick }) => {
    const optionLetters = ['A', 'B', 'C', 'D'];

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-6">{question.title}</h2>
            <ul className="space-y-4">
                {question.answers.map((answer, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onAnswerClick(index)}
                            className={`w-full text-left p-4 rounded-lg ${selectedAnswer === index ? 'bg-gray-600' : 'bg-gray-700'} hover:bg-gray-600 transition-all duration-300`}
                        >
                            <span className="font-bold mr-2">{optionLetters[index]}.</span>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Card;