import React, {useState} from 'react';
import Select, {MultiValue} from "react-select";
import quests from './quests.json';

const options = {
  questType: [
    {label: "Hub", value: "H"},
    {label: "Village", value: "V"},
    {label: "Event", value: "E"},
  ],
  stars: [
    {label: "8★", value: 8},
    {label: "7★", value: 7},
    {label: "6★", value: 6},
    {label: "5★", value: 5},
    {label: "4★", value: 4},
    {label: "3★", value: 3},
    {label: "2★", value: 2},
    {label: "1★", value: 1},
  ]
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


function App() {
  const [questTypes, setQuestTypes] = useState<MultiValue<{ label: string, value: string }>>([]);
  const [numStars, setNumStars] = useState<MultiValue<{ label: string, value: number }>>([]);
  const [randomQuest, setRandomQuest] = useState('');

  const getRandomQuest = () => {
    const qTypes = questTypes.map(qt => qt.value);
    const nStars = numStars.map(ns => ns.value);
    const candidates = quests.filter(q => qTypes.includes(q.type) && nStars.includes(q.stars));
    if (candidates.length > 0) {
      const index = getRandomInt(candidates.length);
      setRandomQuest(candidates[index].title);
    } else {
      alert("No quests matching provided criteria!");
      setRandomQuest('');
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-2">
      <h1>MHR Randomizer</h1>
      <p>Bored of doing the same quests over and over in the endgame? Use MHR Randomizer to pick random quests for
        variety!</p>
      <div className="w-full max-w-screen-lg flex gap-x-3 justify-center">
        <Select isMulti placeholder="Quest type" options={options.questType} className="grow max-w-xs"
                value={questTypes} onChange={setQuestTypes} />
        <Select isMulti placeholder="Stars" options={options.stars} className="grow max-w-xs" value={numStars}
                onChange={setNumStars} />
      </div>
      <div>
        <button type="button" className="border border-gray-300 py-1 px-2 rounded-sm" onClick={getRandomQuest}>Get
          random quest
        </button>
      </div>
      <div>{randomQuest}</div>
    </div>
  );
}

export default App;
