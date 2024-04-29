import React, { Fragment, useCallback, useEffect, useState } from 'react';
import TopicLabel from './TopicLabel';

type Props = {
  filterPosts: (_searchTerm: string, _activeTopic: string[]) => void;
  topicsPosts: string[];
  activeTopicsRemaining: string[];
};

const SearchPosts = ({ filterPosts, topicsPosts, activeTopicsRemaining }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  useEffect(() => {
    filterPosts(searchTerm, activeTopics);
  }, [searchTerm, filterPosts, activeTopics]);

  const searchPostChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const setActiveTopicHandler = (topic: string) => {
    if (activeTopics.includes(topic)) {
      setActiveTopics(activeTopics.filter((t) => t !== topic));
    } else {
      setActiveTopics([...activeTopics, topic]);
    }
  };

  const checkIfActiveTopic = useCallback(
    (topic: string) => {
      return activeTopics.includes(topic);
    },
    [activeTopics]
  );

  const checkIfActiveTopicIsAvailable = useCallback(
    (topic: string) => {
      return activeTopicsRemaining.includes(topic);
    },
    [activeTopicsRemaining]
  );

  return (
    <section className="mb-4 mt-4">
      <p className="mb-2">Thoughts, mental models, research and my own experiences. Sharing ideas for a better life.</p>
      <input
        type="text"
        name="searchPosts"
        placeholder="Search Posts by Title, Description or Content"
        id="searchPosts"
        className={
          'min-w-full rounded-md border-2 border-[color:var(--color-accent)] bg-secondary p-2  focus:outline-none focus:ring-1 focus:ring-[var(--color-blog-title)]'
        }
        value={searchTerm}
        onChange={searchPostChangeHandler}
        autoCorrect="off"
        spellCheck="false"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <p className="flex items-center">Choose a topic:</p>
        {topicsPosts.map((topic) => (
          <Fragment key={topic}>
            <TopicLabel
              topic={topic}
              setActiveTopic={setActiveTopicHandler}
              isActive={checkIfActiveTopic(topic)}
              isStillAvailable={checkIfActiveTopicIsAvailable(topic)}
            />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default SearchPosts;
