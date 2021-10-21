import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Entypo from "@expo/vector-icons/Entypo";
import styles from '../style/style';

const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const NBR_OF_SHIP_POSITIONS = 3;
const initialBoard = new Array(NBR_OF_ROWS * NBR_OF_COLS).fill({ icon: START, value: false, isClicked: false });

export default function Gameboard() {

    const [board, setBoard] = useState(initialBoard);
    const [ships, setShips] = useState(3);
    const [bombs, setBombs] = useState(15);
    const [hits, setHits] = useState(0);
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);
    const [buttonText, setButtonText] = useState("Start game");
    const [statusTxt, setStatusTxt] = useState("Game has not started.");
    let intervalRef = useRef();

    const increaseNum = () => setTime((prev) => prev + 1);
    useEffect(() => {
        if (status) {
            intervalRef.current = setInterval(increaseNum, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [status]);


    useEffect(() => {
        if (bombs < 1 || time === 30) {
            setStatus(false);
            time === 30 ? setStatusTxt("Timeout. Ships remaining.") : setStatusTxt("Game over! Ships remaining.");
        } 
        if (ships === 0) {
            setStatus(false);
            setStatusTxt("You sinked all ships.");
        }  
        
    }, [bombs, ships, time]);

    const resetGame = () => {
        for (let i = 0; i < initialBoard.length; i++) {
            board[i] = { icon: START, value: false, isClicked: false }
        }
        
        setStatus(true);
        setButtonText("New game");
        setStatusTxt("Game on...")
        setPositions();
        setBombs(15);
        setHits(0);
        setTime(0);
        setShips(3);
    }

    const setPositions = () => {

        let newBoard = [...board];

        // Make random ship positions (no same positions)
        let i = 0;
        let shipPosition = [];
        while (i < NBR_OF_SHIP_POSITIONS) {
            let randomNum = Math.floor(Math.random() * 25);
            if (shipPosition.indexOf(randomNum) === -1) {
                shipPosition.push(randomNum);
                i++;
            }
        }
        // Set positions to the board
        for (let x = 0; x < shipPosition.length; x++) {
            let position = shipPosition[x];
            newBoard[position] = { icon: START, value: true, isClicked: false };
        }
        setBoard(newBoard);
    }

    const draw = (number) => {
        if (status === false) {
            setStatusTxt("Click the start button first...")
            return;
        }
        if (board[number].isClicked === false) {
            board[number].isClicked = true;
            if (board[number].value === false && board[number].isClicked === true) {
                board[number].icon = CROSS;
            }
            else if (board[number].value === true && board[number].isClicked === true) {
                board[number].icon = CIRCLE;
                setHits(hits + 1);
                setShips(ships - 1);
            }
            else {
                board[number].icon = START;
            }
            setBombs(bombs - 1);
        }
    }

    const itemColor = (number) => {
        if (board[number].icon === CIRCLE) {
            return 'lime';
        }
        else if (board[number].icon === CROSS) {
            return '#3d3d3d';
        }
        else {
            return 'green';
        }
    }

    const items = [];
    for (let a = 0; a < NBR_OF_ROWS; a++) {
        const cols = [];
        for (let b = 0; b < NBR_OF_COLS; b++) {
            cols.push(
                <Pressable
                    key={b * NBR_OF_COLS + a}
                    onPress={() => draw(b * NBR_OF_COLS + a)}
                    style={styles.items}
                >
                    <Entypo
                        key={a * NBR_OF_COLS + b}
                        name={board[b * NBR_OF_COLS + a].icon}
                        size={35}
                        color={itemColor(b * NBR_OF_COLS + a)}
                    />
                </Pressable>
            );
        }
        let row =
            <View key={"row" + a}>
                {cols.map((item) => item)}
            </View>
        items.push(row);
    }

    return (
        <View style={styles.gameBoard}>
            <Text style={styles.flex}>{items}</Text>
            <Pressable onPress={resetGame} style={styles.resetBtn}>
                <Text style={styles.resetBtnTxt}>{buttonText}</Text>
            </Pressable>
            <Text style={styles.statusTxt}>Hits: {hits} | Bombs: {bombs} | Ships: {ships}</Text>
            <Text style={styles.statusTxt}>Time: {time} secs</Text>
            <Text style={styles.statusTxt}>Status: {statusTxt}</Text>
        </View>
    )
}
