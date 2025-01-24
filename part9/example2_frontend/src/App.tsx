import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createEntry} from './diaryService';
import Header from "./components/header";
import Content from './components/content';
import Input from './components/input';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]> ([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Good);
  const [newComment, setNewComment] = useState('');

  useEffect(()=> {
    getAllDiaries().then(data => {
      setEntries(data);
    });
  }, []);


  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: newDate,
      weather:newWeather,
      visibility:newVisibility,
      comment:newComment
    }).then(data => {
      setEntries(entries.concat(data));
    });
    /**
     * Resetting states after each add operation
     */
    setNewDate('');
    setNewWeather(Weather.Sunny);
    setNewVisibility(Visibility.Good);
    setNewComment('');
    
  };

  const header = 'Diary Entries';

  return (
    <div>
      <Input
        addEntry={entryCreation}
        newDate={newDate}
        newWeather={newWeather}
        newVisibility={newVisibility}
        newComment={newComment}
        setNewDate={setNewDate}
        setNewWeather={setNewWeather}
        setNewVisibility={setNewVisibility}
        setNewComment={setNewComment}
      />
      <Header name ={header}/>
      <Content diaries = {entries} />
        
    </div>
  )
}

export default App
