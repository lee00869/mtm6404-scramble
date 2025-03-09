/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

//get div
const root = ReactDOM.createRoot(document.getElementById('root'))

// array of words
const words = [
  'REACT' ,
  'HTML',
  'MOBILE',
  'JAVASCRIPT',
  'WORDPRESS',
  'GITHUB',
  'STORAGE',
  'INDEX',
  'PULL',
  'PUSH',
]

//shuffle words
const shuffledSpell = words.map(word => shuffle(word));

//app function
const App = () => {

  //react
  const [shuffledWords, setShuffledWords] = React.useState(shuffledSpell)
  const [currentWord, setCurrentWord] = React.useState(()=> {
    return JSON.parse(localStorage.getItem('currentWord')) || 0})
  const [answer, setAnswer] = React.useState('')
  const [outcome, setOutcome] = React.useState('')
  const [maxPasses, setMaxPasses] = React.useState(()=> {
    return JSON.parse(localStorage.getItem('maxPasses')) || 3})
  const [strike, setStrike] = React.useState(()=> {
    return JSON.parse(localStorage.getItem('strike')) || 0})
  const [point, setPoint]= React.useState(()=> {
    return JSON.parse(localStorage.getItem('point')) || 0})

    React.useEffect(() => {
      localStorage.setItem('currentWord', currentWord)
      localStorage.setItem('maxPasses', maxPasses)
      localStorage.setItem('strike', strike)
      localStorage.setItem('point', point)
    }, [currentWord, maxPasses, strike, point])

  //handler
  const answerHandler = (e) => {
    e.preventDefault();
    
    setAnswer('');

    if (answer.toUpperCase() === words[currentWord]){
      setPoint((prevItem) => prevItem + 1);
      setOutcome('Correct. Good Job!')
      setCurrentWord((prev) => (prev + 1) % words.length);
    }else {
      setStrike((prevItem) => prevItem + 1);
      setOutcome('Wrong. Try Again!')
    }

    if (strike === 3){
      setAnswer('');
      setOutcome('Game Over! Play Again!')
    }
  }

  const passesHandler = () => {
    if (maxPasses > 0){
      setCurrentWord((prevItem) => (prevItem + 1) % words.length);
      setMaxPasses((prevItem) => prevItem - 1);
      setAnswer('');
      setOutcome('You pass the word!')
    } else if(maxPasses === 0){
      setStrike(3)
      setAnswer('');
      setOutcome('Game Over! Play Again!')
    }
    else{
      setStrike(3)
      setAnswer('');
      setOutcome('Game Over! Play Again!')
    }

  }

  const inputHandler = (e) => {
    setAnswer(e.target.value)
  }

  const restartHandler = () => {
    setPoint(0);
    setStrike(0);
    setMaxPasses(3);
    setCurrentWord(0);
    setOutcome('');
    setAnswer('');
  }

    // Word 
    const Word = ({ word }) => {
        const style = {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'sans-serif',
        }

        return (
            <div style={style}>
                <h3>{word.vocabulary}</h3>
            </div>
        )
    }

  //component
  const style = {
      display: 'flex',
      flexDirection : 'row',
                  justifyContent: 'space-between',
            alignItems: 'center',
  };

  const textStyle = {
    textAlign: 'center'
  }

  const outcomeColor = () => {
    if (outcome==='Correct. Good Job!'){
      return '#D1FFBD'
    } else if (outcome==='Wrong. Try Again!'){
      return 'antiquewhite'
    } else if (outcome==='You pass the word!'){
      return '#ADD8E6'
    } else if (outcome==='Game Over! Play Again!'){
      return '#FF7F7F'
    } else {
      return 'white'; 
    }
  }

  const outcomePadding = () => {
    if (outcome==='Correct. Good Job!'){
      return '1.5rem'
    } else if (outcome==='Wrong. Try Again!'){
      return '1.5rem'
    } else if (outcome==='You pass the word!'){
      return '1.5rem'
    } else if (outcome==='Game Over! Play Again!'){
      return '1.5rem'
    } else {
      return '0rem'; 
  }}

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    textTransform: 'uppercase'
  }

  const buttonStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0.5rem',
  }

  const outcomeStyle = {
    textAlign: 'center',
    backgroundColor: outcomeColor(),
    padding: outcomePadding()
  }

  const btnsStyle = {
    display: 'flex',
    flexDirection : 'row',
                justifyContent: 'space-evenly',
          alignItems: 'center',
};

    return (
        <div>
            <h1>Welcome to Scramble</h1>
            <div style={style}>
              <span><h2>{point}</h2>POINTS</span>
              <span><h2>{strike}</h2>STRIKES</span>
            </div>

            <div><h3 style={outcomeStyle}>{outcome}</h3></div>

            <div>
            <h2 style={textStyle}>{shuffledWords[currentWord]}</h2>
            <form onSubmit={answerHandler} disabled={strike >= 3}>
              <input id="input" type="text" onChange={inputHandler} disabled={strike >= 3} style={inputStyle} answer={answer} value={answer}/>
            </form>
            <div style={btnsStyle}>
            <button style={buttonStyle} onClick={passesHandler} disabled={strike >= 3} type="button">{maxPasses} Passes Remaining</button> 
            
            {strike > 2 ? <button style={buttonStyle} onClick={restartHandler} type="button"> Play Again</button>  : '' }
            </div>

            </div>
        </div>
    );
};

root.render(<App />);
