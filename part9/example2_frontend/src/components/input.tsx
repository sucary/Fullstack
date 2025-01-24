import { Weather, Visibility } from "../types";

interface InputProps {
  addEntry: (event: React.SyntheticEvent) => void;
  newDate: string;
  newWeather: Weather;
  newVisibility: Visibility;
  newComment: string;
  setNewDate: (value: string) => void;
  setNewWeather: (value: Weather) => void;
  setNewVisibility: (value: Visibility) => void;
  setNewComment: (value: string) => void;
}

const Input = ({   
	addEntry,
  newDate,
  newWeather,
  newVisibility,
  newComment,
  setNewDate,
  setNewWeather,
  setNewVisibility,
  setNewComment 
}:InputProps ) => {

	return (
		<form onSubmit={addEntry}>
			<div> Date
				<input 
					value = {newDate}
					onChange = {(event) => setNewDate(event.target.value)}
				/>
			</div>
			<div> Weather
				<input 
					value={newWeather}
					onChange = {(event) => setNewWeather(event.target.value as Weather)}
				/>
			</div>
			<div> Visibility
				<input 
					value = {newVisibility}
					onChange = {(event) => setNewVisibility(event.target.value as Visibility)}
				/>
			</div>
			<div> Comment
				<input 
					value = {newComment}
					onChange = {(event) => setNewComment(event.target.value)}
				/>
			</div>
			<div>
				<button type = "submit">add entry</button>
			</div>
		</form>
	)
};

export default Input;