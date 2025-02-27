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
  'CSS',
  'JAVASCRIPT',
  'CMS',
  'PHP',
  'STORAGE',
  'INDEX',
  'PULL',
  'PUSH',
]

//shuffle words
const shuffledSpell = words.map(word => shuffle(word));

//app function
const App = () => {

  
  const maxPasses = 3;
  const maxStrikes =3;

  const [shuffledWords, setShuffledWords] = React.useState(shuffledSpell)
  const [currentWord, setCurrentWord] = React.useState(0)
  const [answer, setAnswer] = React.useState('');
  const [outcome, setOutcome] = React.useState('');
  // const [data, setData] = React.useState('savedData');

  //local storage
//   const savedData = () => {
//   const [codes, setCodes] = React.useState(() => {
//     return JSON.parse(localStorage.getItem('codes')) || shuffle(words);
//   });

//   React.useEffect(() => {
//     localStorage.setItem('codes', JSON.stringify(codes))
//   }, [JSON.stringify(codes)])
// }

  //handle answer
  const answerHandler = (e) => {
    e.preventDefault();


    // Move to the next word
    setCurrentWord((prev) => (prev + 1) % words.length);
    
    // Reset input field
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

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem'
  }

  const buttonStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0.5rem'
  }


    return (
        <div>
            <h1>Welcome to Scramble</h1>
            <div style={style}>
              <span>POINTS</span>
              <span>STRIKES</span>
            </div>
            <div>
            <h2 style={textStyle}>{shuffledWords[currentWord]}</h2>
            <form onSubmit={answerHandler}>
              <input id="input" type="text" style={inputStyle}/> 
            </form>
            <button style={buttonStyle} onClick={() => setShuffledWords(shuffle(words))} type="button">Passes Remaining</button> 
            </div>
        </div>
    );
};

root.render(<App />);
