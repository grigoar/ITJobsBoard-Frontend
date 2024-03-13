import React from 'react';

type Props = {
  topic: string;
  isActive: boolean;
  isStillAvailable: boolean;
  setActiveTopic: (_topic: string) => void;
};
const TopicLabel = ({ topic, isActive, setActiveTopic, isStillAvailable }: Props) => {
  const setActiveTopicHandler = () => {
    setActiveTopic(topic);
  };

  return (
    <button
      key={topic}
      onClick={setActiveTopicHandler}
      className={`rounded-md ${
        isActive ? 'bg-[color:var(--color-accent)]' : ''
      } cursor-pointer border-2 border-[color:var(--color-accent)] px-2 py-1 text-sm font-semibold ${
        isActive ? 'text-[var(--color-accent-text)]' : ''
      } ${!isStillAvailable ? 'disabled:opacity-25' : ''} 
      `}
      disabled={!isStillAvailable}
    >
      {topic}
    </button>
  );
};

export default TopicLabel;
