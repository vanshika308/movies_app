import React,{useRef} from 'react';
import classes from './InputForm.module.css';

const InputForm =()=>{

   const enteredTitle = useRef();
   const enteredOpeningText=useRef();
   const enteredDate = useRef();


   const submitHnadler = (event) => {
    event.preventDefault();
    const newMovieObject = {
      title: enteredTitle.current.value,
      OpeningText: enteredOpeningText.current.value,
      releaseDate: enteredDate.current.value,
    };

    console.log(newMovieObject);
  };

   return(
      <form>
        <label>Title</label>
        <input type="text"
          ref={enteredTitle}
          id="title"/>
        <label>Opening text</label>
        <input className={`${classes.input} ${classes.openingTextInput}`} 
        type="text"
        ref={enteredOpeningText}
        id='enteredOpeningText'/>
        <label>Release Date</label>
        <input ref={enteredDate}
            type="text"
            id="date"/>
        <button type="submit" onClick={submitHnadler}>Add movie</button>
      </form>
   );
}

export default InputForm;