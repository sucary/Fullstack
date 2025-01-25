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

	const weatherSelected = (value: Weather) => {
    console.log(value)
  }

	return (
		<form onSubmit={addEntry}>

			<div> Date
				<input 
					type = "date"
					value = {newDate}
					onChange = {(event) => setNewDate(event.target.value)}
				/>
			</div>

			<div> Weather:

				<input type="radio" id="weather1" name="weather" value= {newWeather}
				onChange={() => setNewWeather(Weather.Sunny)}/>
				<label htmlFor="weather1">Sunny</label>

				<input type="radio" id="weather2" name="weather" value= {newWeather}
				onChange={() => setNewWeather(Weather.Cloudy)}/>
				<label htmlFor="weather2">Cloudy</label>

				<input type="radio" id="weather3" name="weather" value= {newWeather}
				onChange={() => setNewWeather(Weather.Rainy)}/>
				<label htmlFor="weather3">Rainy</label>

				<input type="radio" id="weather4" name="weather" value= {newWeather}
				onChange={() => setNewWeather(Weather.Windy)}/>
				<label htmlFor="weather4">Windy</label>

				<input type="radio" id="weather5" name="weather" value= {newWeather}
				onChange={() => setNewWeather(Weather.Stormy)}/>
				<label htmlFor="weather5">Stormy</label>
			</div>

			<div> Visibility:

				<input type="radio" id="visibility1" name="visibility" value= {newVisibility}
				onChange={() => setNewVisibility(Visibility.Great)}/>
				<label htmlFor="visibility1">Great</label>

				<input type="radio" id="visibility2" name="visibility" value= {newVisibility}
				onChange={() => setNewVisibility(Visibility.Good)}/>
				<label htmlFor="visibility2">Good</label>

				<input type="radio" id="visibility3" name="visibility" value= {newVisibility}
				onChange={() => setNewVisibility(Visibility.Ok)}/>
				<label htmlFor="visibility3">Ok</label>

				<input type="radio" id="visibility4" name="visibility" value= {newVisibility}
				onChange={() => setNewVisibility(Visibility.Poor)}/>
				<label htmlFor="visibility4">Bad</label>
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