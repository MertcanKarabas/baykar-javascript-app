import React from "react";

const Header = ({ timer, currentQuestion }) => {
  return (
    <div className="flex flex-row  space-x-5 justify-between px-8 py-4 bg-gray-800 rounded-lg mb-8">
      <div className="text-lg font-bold">Question {currentQuestion}</div>
      <div className="text-lg font-bold">{timer}s</div>
    </div>
  );
};

export default Header;