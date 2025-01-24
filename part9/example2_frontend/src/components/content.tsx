import { DiaryEntry } from "../types";

const Content = ({diaries}: {diaries: DiaryEntry[]}) => {
  return (
    <div>
      {diaries.map((entry) => (
        <div>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
        </div>
      ))}
    </div>
  )
}

export default Content;