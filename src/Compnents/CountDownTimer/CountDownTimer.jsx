import React, { useState, useEffect } from 'react';

const CountDownTimer = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(7 * 60 + 30);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div>
            {formatTime(timeLeft)}
        </div>
    );
};

export default CountDownTimer;
