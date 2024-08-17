import { useEffect, useState } from "react";

const Timer = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 0) return prev - 1;
                clearInterval(timer);
                onTimeUp();
                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeUp]);

    return (
        <div className="fixed top-4 right-4 text-2xl font-bold w-16 h-16 flex items-center justify-center rounded-full bg-gray-800">
            {timeLeft}
        </div>
    );
};

export default Timer;