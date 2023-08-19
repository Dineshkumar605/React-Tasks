import React, { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import './TodoStyle.css'

function ToDoList() {

    const focusPoint = useRef();
    const [todoValueArray, setTodoValueArray] = useState(JSON.parse(localStorage.getItem("UserInputValue")) || [])
    const [userTypedValue, setUserTypedValue] = useState('')
    const [editValue, setEditValue] = useState('')
    const [tick, setTick] = useState(false)
    const [footerBtns, setFooterBtns] = useState('All')
    const [count, setCount] = useState(0)
    const [completeBtn, setCompleteBtn] = useState(false)

    const localStorageValues = JSON.parse(localStorage.getItem("UserInputValue"));
    const isEditLengh = todoValueArray?.filter((item) => item?.isEdit === true)
    const countValue = localStorageValues?.filter((item) => item?.tick === false);
    focusPoint.current?.focus();

    useEffect(() => {
        setCount(countValue?.length)
        if (countValue?.length !== localStorageValues?.length) {
            setTick(true)
        } else {
            setTick(false)
        }
        // eslint-disable-next-line
    }, [countValue, footerBtns])

    useEffect(() => {
        if (footerBtns === 'completed') {
            const completedList = localStorageValues?.filter((item) => item.tick === true)
            setTodoValueArray(completedList);
        }
        // eslint-disable-next-line
    }, [completeBtn])

    const handleUserInput = (e) => {
        setEditValue(e.target.value)
        setUserTypedValue(e.target.value)
    }

    const enterKeyPress = (e, index, isBlur = false, id) => {
        if ((e?.key === 'Enter' || isBlur) && todoValueArray[index]?.isEdit) {
            let updatedValue = [...todoValueArray]
            updatedValue[index] = { id: id, isEdit: false, value: userTypedValue === '' ? updatedValue[index]?.value === '' ? '' : todoValueArray[index]?.value : userTypedValue, tick: todoValueArray[index]?.tick ? true : false, isHover: false }
            if (updatedValue[index]?.value === '' || editValue === '') {
                updatedValue.splice(index, 1);
            }
            setTodoValueArray(updatedValue);
            setUserTypedValue('')
            localStorage.setItem('UserInputValue', JSON.stringify(updatedValue))

        } else if (userTypedValue !== '' && e?.key === 'Enter' && !todoValueArray[index]?.isEdit) {
            const id = Date.now();
            let localStorageValues = JSON.parse(localStorage.getItem("UserInputValue"));
            if (!localStorageValues?.length) {
                localStorageValues = []
            }
            let updatedValue = [...localStorageValues, { id: id, isEdit: false, value: userTypedValue, tick: false, isHover: false }]
            setUserTypedValue('')
            localStorage.setItem('UserInputValue', JSON.stringify(updatedValue));
            if (footerBtns === 'completed') {
                let tempArray = [...localStorageValues]
                const completedList = tempArray?.filter((item) => item.tick === true)
                setTodoValueArray(completedList);
            } else if (footerBtns === 'Active') {
                const completedList = updatedValue?.filter((item) => item.tick === false)
                setTodoValueArray(completedList);
            } else {
                setTodoValueArray(updatedValue)
            }
        }
    }

    const handleCancelBtn = (index, id) => {
        if (footerBtns === 'Active' || footerBtns === 'completed') {
            let updatedValue = todoValueArray.filter((item) => item.id !== id)
            setTodoValueArray(updatedValue);
            let remaingObjects = localStorageValues.filter((item) => item.id !== id);
            localStorage.setItem('UserInputValue', JSON.stringify(remaingObjects))
        } else {
            let updatedValue = [...todoValueArray]
            updatedValue.splice(index, 1)
            setTodoValueArray(updatedValue)
            localStorage.setItem('UserInputValue', JSON.stringify(updatedValue))
        }
    }

    const handleDoubleClick = (e, index) => {
        if (e?.detail === 2) {
            todoValueArray.map((item) => {
                return item.isEdit = false;
            })
            let updatedValue = [...todoValueArray]
            updatedValue[index] = { ...updatedValue[index], isEdit: true }
            setTodoValueArray(updatedValue)
            setEditValue(updatedValue[index].value)
            localStorage.setItem('UserInputValue', JSON.stringify(updatedValue))
        }
    }

    const handleTickButton = (index) => {
        if (todoValueArray[index]?.tick) {
            if (footerBtns === 'completed') {
                let updatedValue = [...todoValueArray]
                updatedValue[index] = { ...updatedValue[index], tick: false }
                let completedTrue = updatedValue?.filter((item) => item.tick === true)
                let remaingValues = localStorageValues?.filter((item) => item.id !== updatedValue[index].id)
                let currentValue = localStorageValues?.filter((item) => item.id === updatedValue[index].id)
                currentValue = [{ ...currentValue[0], tick: false }]
                setTodoValueArray(completedTrue)
                localStorage.setItem('UserInputValue', JSON.stringify([...remaingValues, ...currentValue]))
            } else {
                let updatedValue = [...localStorageValues]
                updatedValue[index] = { ...updatedValue[index], tick: false }
                setTodoValueArray(updatedValue)
                localStorage.setItem('UserInputValue', JSON.stringify(updatedValue))
            }
        } else {
            if (footerBtns === 'Active') {
                let updatedValue = [...todoValueArray]
                updatedValue[index] = { ...updatedValue[index], tick: true }
                let completedTrue = updatedValue?.filter((item) => item.tick === false)
                let remaingVAlues = localStorageValues?.filter((item) => item.id !== updatedValue[index].id)
                let currentValue = localStorageValues?.filter((item) => item.id === updatedValue[index].id)
                currentValue = [{ ...currentValue[0], tick: true }]
                setTodoValueArray(completedTrue)
                localStorage.setItem('UserInputValue', JSON.stringify([...remaingVAlues, ...currentValue]))
            } else {
                let updatedValue = [...todoValueArray]
                updatedValue[index] = { ...updatedValue[index], tick: true }
                setTodoValueArray(updatedValue)
                localStorage.setItem('UserInputValue', JSON.stringify(updatedValue))
            }
        }
    }

    const handleActiveBtn = () => {
        const copyLocalStoageArray = localStorageValues;
        const activeList = copyLocalStoageArray?.filter((item) => item.tick === false)
        setTodoValueArray(activeList);
        setFooterBtns('Active')
        setCompleteBtn(false)
    }

    const handleCompletedBtn = () => {
        let copyLocalStoageArray = localStorageValues
        const completedList = copyLocalStoageArray?.filter((item) => item.tick === true)
        setTodoValueArray(completedList);
        setFooterBtns('completed');
        setCompleteBtn(false)
    }

    const handleAllBtn = () => {
        setTodoValueArray(localStorageValues);
        setFooterBtns('All')
        setCompleteBtn(false)
    }

    const handleClearBtn = () => {
        let tickFalseArray = localStorageValues?.filter((item) => item.tick === false);
        setCompleteBtn(true)
        localStorage.setItem('UserInputValue', JSON.stringify(tickFalseArray))
        if (footerBtns !== 'completed') {
            setTodoValueArray(tickFalseArray);
        }
    }

    const handleAllCompleted = () => {
        let idArray = [];
        if (footerBtns === 'completed' || footerBtns === 'Active') {
            const allCompleted = localStorageValues?.map((item) => {
                idArray.push(item.id)
                if (footerBtns === 'Active' && count !== 0) {
                    item.tick = true;
                } else if (footerBtns === 'Active' && count === 0) {
                    item.tick = false;
                } else if (footerBtns === 'completed' && count !== 0) {
                    item.tick = true;
                } else if (footerBtns === 'completed' && count === 0) {
                    item.tick = false;
                }
                return item
            })

            let remaingValues = localStorageValues?.filter((item) => !idArray.includes(item.id))
            localStorage.setItem('UserInputValue', JSON.stringify([...remaingValues, ...allCompleted]))
            if (footerBtns === 'completed') {
                const completedList = allCompleted?.filter((item) => item.tick === true)
                setTodoValueArray(completedList);
            } else if (footerBtns === 'Active') {
                const activeList = allCompleted?.filter((item) => item.tick === false)
                setTodoValueArray(activeList);
            }
        } else {
            const allCompleted = localStorageValues?.map((item) => {
                if (count !== 0) {
                    item.tick = true;
                } else {
                    item.tick = false;
                }
                return item
            })
            setTodoValueArray(allCompleted);
            localStorage.setItem('UserInputValue', JSON.stringify(allCompleted))
        }
    }

    const handleMouseHover = (index) => {
        todoValueArray?.map((item) => {
            return item.isHover = false;
        })
        let updatedValue = [...todoValueArray]
        updatedValue[index] = { ...updatedValue[index], isHover: true }
        setTodoValueArray(updatedValue)
    }

    const handleMouseOut = (index) => {
        let updatedValue = [...todoValueArray]
        updatedValue[index] = { ...updatedValue[index], isHover: false }
        setTodoValueArray(updatedValue)

    }

    const handledomClick = (e, index) => {
        enterKeyPress(e, index, true)
    }

    return (
        <div className='container'>
            <h1 className='heading'>todos</h1>
            <div className='sub-container'>
                <div className='input-area'>
                    <div className='down-arrow'>
                        {localStorageValues.length ? <button id='downarrow-btn' onClick={handleAllCompleted} style={{ color: count === 0 ? "gray" : "#e6e6e6" }} >< FaAngleDown className='downarrow-icon' /></button> : <div></div>}
                    </div>
                    <div className='user-input-box'>
                        <input type='text' name='user-input' id='typed-text' placeholder='What needs to be done?' value={isEditLengh?.length ? '' : userTypedValue} onChange={(e) => handleUserInput(e)} onKeyDown={(e) => enterKeyPress(e)} />
                    </div>
                </div>
                <div className='list-area'>
                    {todoValueArray ? todoValueArray?.map((item, index) => {
                        return <div key={index} className='single-list' onMouseOver={() => handleMouseHover(index)} onMouseOut={() => handleMouseOut(index)} >
                            <div className='list-show-area'>
                                {!todoValueArray[index]?.isEdit && <button className='tick-btn' onClick={() => handleTickButton(index)} >{todoValueArray[index]?.tick ? <FaCheck className='tick-icon' /> : null}</button>}
                                {todoValueArray[index]?.isEdit ? <input className='list-text' ref={focusPoint} id='updated-textbox' type='text' defaultValue={editValue} onChange={(e) => handleUserInput(e, index)} onBlur={(e) => handledomClick(e, index)} onKeyDown={(e) => enterKeyPress(e, index, item.id)} /> : <div className='list-value' style={{ textDecoration: todoValueArray[index]?.tick ? "line-through" : "none", color: todoValueArray[index]?.tick ? 'gray' : 'black' }} onClick={(e) => handleDoubleClick(e, index)}>{item?.value}</div>}
                                {!todoValueArray[index]?.isEdit && <button className='cancel-btn' onClick={() => handleCancelBtn(index, item.id)}><FaXmark className='cancel-icon' style={{ visibility: todoValueArray[index]?.isHover ? 'visible' : 'hidden' }} /></button>}
                            </div>
                        </div>
                    }) : <div></div>}
                    {localStorageValues?.length ? <div className='footer-area'>
                        <p>{count} item left</p>
                        <div className='footer-buttons'>
                            <button className='footer-btn all-btn' style={{ border: footerBtns === 'All' ? "1px solid lightpink" : "none" }} onClick={handleAllBtn}>All</button>
                            <button className='footer-btn' style={{ border: footerBtns === 'Active' ? "1px solid lightpink" : "none" }} onClick={handleActiveBtn}>Active</button>
                            <button className='footer-btn' style={{ border: footerBtns === 'completed' ? "1px solid lightpink" : "none" }} onClick={handleCompletedBtn}>Completed</button>
                        </div>
                        {footerBtns !== 'Active' && (tick || count === 0) && <button className='clear-btn' onClick={handleClearBtn}>Clear completed</button>}
                    </div> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default ToDoList;