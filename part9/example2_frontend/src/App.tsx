import { useEffect, useState } from 'react'
import './App.css'
import { toNewEntry } from './utils';
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createEntry} from './diaryService';
import Header from "./components/header";
import Content from './components/content';
import Input from './components/input';
import { z } from 'zod';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]> ([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Good);
  const [newComment, setNewComment] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(()=> {
    getAllDiaries().then(data => {
      setEntries(data);
    });
  }, []);


  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      date: newDate,
      weather:newWeather,
      visibility:newVisibility,
      comment:newComment
    };

    try {
      const validatedEntry = toNewEntry(entryToAdd);

      createEntry(validatedEntry).then((data) => {
        if (data) {
          setEntries(entries.concat(data));
        }
      })
      setNewDate('');
      setNewWeather(Weather.Sunny);
      setNewVisibility(Visibility.Good);
      setNewComment('');

    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format() as { [key: string]: { _errors?: string[] } };
        const fieldErrors: { [key: string]: string } = {};
      
        for (const field in formattedErrors) {
          if (field !== "_errors") {
            const fieldError = formattedErrors[field]?._errors?.[0];
            if (fieldError) {
              fieldErrors[field] = fieldError;
            }
          }
        }
      
        setErrors(fieldErrors);
      }
    }
  }

  const header = 'Diary Entries';

  return (
    <div>
      {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
      {errors.weather && <p style={{ color: 'red' }}>{errors.weather}</p>}
      {errors.visibility && <p style={{ color: 'red' }}>{errors.visibility}</p>}
      {errors.comment && <p style={{ color: 'red' }}>{errors.comment}</p>}
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

export default App;
