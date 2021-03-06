import {useState, useEffect, useCallback, useMemo, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

function reducer (state, action) {
    switch (action.type) {
        case 'toggle':
            return {autoplay: !state.autoplay};
        case 'slow':
            return {autoplay: 300}
        case 'fast':
            return {autoplay: 700}
        case 'custom':
            return {autoplay: action.payload}
        default:
            throw new Error();
    }
}

const countTotal = (num) => {
    return num + 10;
}

const Slider = (props) => {
 
    const [slide, setSlide] = useState(0);
    // means we are doing destructurization of the array we are receiving from useState
    // const [ here we put first state, here function name] = useState( first state argument)
    // const [autoplay, setAutoplay] = useState(falce);
    const [autoplay, dispatch] = useReducer(reducer, false);

    function logging() {
        console.log('log');
    }
    // ?????? ???????????? ?????????????????? ???? ?? ???????????? ???????? ?????????????????? [slide] ?? ???????? ????, ???? ?????????????????? ???????????? ???????? ??????????????
    // ?????????????? ?????????????????? (????????. ???? ?????????????? ???? ???????????? ???????????????? ?????????? ??????????????)
    useEffect(() => {
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }
    }, [slide])

    const getSomeImages = useCallback(() => {
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
        ]
    }, [slide]);

    function changeSlide (i) {
        setSlide(slide + i)
    }
    // function toggleAutoplay () {
    //     setAutoplay(!autoplay);
    // }

    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(() => ({ 
            color: slide > 4 ? 'red' : 'green' 
    }), [slide])

    useEffect(() => {
        console.log('styles');
    }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages} />
                <div className="text-center mt-5">Active slide {slide} <br/>
                 {/* {autoplay ? 'auto' : null} */}
                 {autoplay ? 'true' : 'false'}
                 </div>
                 <div style={style} className="text-center mt-5">Total slides {total} <br/></div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    {/* <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button> */}
                        
                        <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle toggle</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>toggle slow</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>toggle fast</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
const [images, setImages] = useState([]);

useEffect(() => {
    setImages(getSomeImages())
}, [getSomeImages])

return (
    <>
        {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
    </>
)

}

function App() {

    const [slider, setSlider] = useState(true);

  return (
    <>
        <button onClick={() =>setSlider(false)}>Click to delete slider from Dom</button>
        {slider ? <Slider/> : null}
    </>
        
  );
}

export default App;
