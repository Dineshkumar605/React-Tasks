import React, { useEffect, useState } from 'react';
import './BomberStyle.css'

function Bomber() {

    const [points, setPoints] = useState(0)
    const [dimension, setDimension] = useState(3)
    const [negativeValueClick, setNegativeValueClick] = useState(0)
    const [divClicked, setDivClicked] = useState([])
    const [postiveArray, setPostiveArray] = useState([])
    const [dynamicNumbers, setDynamicNumbers] = useState([])
    const [templateColumn, setTemplateColumn] = useState('')
    const [negativeArray, setNegativeArray] = useState(false)
    const dimensionLength = Math.pow(dimension, 2)

    useEffect(() => {
        dynamicArray();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dynamicArray();
        // eslint-disable-next-line
    }, [dimension])

    const dynamicArray = () => {
        let dynamicNumbersArray = []
        let indexArray = [];
        const bomb = -1

        setTemplateColumn('auto '.repeat(dimension))

        while (indexArray.length < dimensionLength) {
            let indexPosition = Math.floor(Math.random() * dimensionLength);
            if (indexArray.indexOf(indexPosition) === -1) {
                indexArray.push(indexPosition)
            };
        }

        for (let i = 0; i < dimensionLength; i++) {
            if (i < Math.round(dimensionLength / 2)) {
                let postiveValue = Math.floor((Math.random() * 3) + 1)
                dynamicNumbersArray[indexArray[i]] = postiveValue
            } else {
                dynamicNumbersArray[indexArray[i]] = bomb
            }
        }
        setDynamicNumbers(dynamicNumbersArray)
    }

    const handleBoxClicked = (index, value) => {
        setDivClicked([...divClicked, index]);

        if (value === -1) {
            setNegativeArray(true)
            setNegativeValueClick(index)
        } else if (!divClicked.includes(index)) {
            setPostiveArray([...postiveArray, index])
            setPoints(points + value)
        }
    }

    const handleWonBtn = () => {
        setDimension(dimension + 1)
        setDivClicked([])
        setPostiveArray([])
        setPoints(0)
        setNegativeArray(0)
    }

    const handleLoseBtn = () => {
        setDimension(3)
        dynamicArray();
        setDivClicked([])
        setPostiveArray([])
        setNegativeArray(false)
        setPoints(0)
        setNegativeArray(0)
    }

    return (
        <div className='container'>
            <div className='score-area'>
                Your points : {points}
            </div>
            <div>
                {postiveArray.length === Math.round(dimensionLength / 2) ?
                    <div className='Game-over-area'>
                        <div className='game-over-text'> You Won :&#41;</div>
                        <button className='gamewon-btn' onClick={() => handleWonBtn()}>NextLevel</button>
                    </div> : null}
                {negativeArray ? <div className='Game-over-area'>
                    <div className='game-over-text'>Game Over :&#40;</div>
                    <button className='gamelose-btn' onClick={() => handleLoseBtn()}>NewGame</button>
                </div> : null}
            </div>
            <div className='game-box' style={{ display: 'grid', gridTemplateColumns: templateColumn }}>
                {dynamicNumbers?.map((item, index) => {
                    return <div className='single-box' key={index}
                        style={{ background: divClicked.includes(index) ? item === -1 ? 'orange' : 'white' : postiveArray.length === Math.round(dimensionLength / 2) ? 'orange' : 'black' }}
                        onClick={(e) => negativeArray ? null : handleBoxClicked(index, item)}  >
                        {item === -1 ? negativeArray ? negativeValueClick !== index ? item : 'x' : postiveArray.length === Math.round(dimensionLength / 2) ? 'X' : item : item}
                    </div>
                })}
            </div>

        </div>
    )
}

export default Bomber;