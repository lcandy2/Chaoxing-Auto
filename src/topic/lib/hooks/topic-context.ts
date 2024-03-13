import React from 'react';

const TopicContext = React.createContext({
  addLogItem: (item: string) => {
  },
  topicDetail: null,
  count: 0,
  standbyTime: 0,
  setRunning: (running: boolean) => {
  }
});

export default TopicContext;
