import BLOCKS from "./blocks.js";

// DOM
const playgound = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
    // movingItem 일시 저장 변수
let tempMovingItem;

    // 다음 블럭의 타입, 좌표와 같은 정보 저장
const movingItem = {
    type: "tree",
    direction: 3,
    top: 0,
    left: 0,
}

// 게임을 시작, 라인 초기화
init()


// fuction


function init() {
    tempMovingItem = {...movingItem}; // movingItem의 값만 저장
    for (let i=0; i<20; i++) {
        prependNewLine();
    }
    generateNewBlock();
    score = 0;
}

function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for(let j=0; j<10; j++)  {
        const metrix = document.createElement("li");
        ul.prepend(metrix);
    }
    li.prepend(ul);
    playgound.prepend(li);
}

// 블럭의 생성 및 움직임 제어
function renderBlocks(moveType="") {
    const {type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    });
    BLOCKS[type][direction].some(block => { // 여기서 type은 tree
        const x = block[0] + left;
        const y = block[1] + top;
        console.log(playgound.childNodes[y]);
        const target = playgound.childNodes[y] ? playgound.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailalbe = checkEmpty(target);
        if(isAvailalbe) {
            target.classList.add(type, "moving");
        }
        else {
            tempMovingItem = {...movingItem}
            if(moveType === "retry") {
                clearInterval(downInterval);
                showGameoverText();
            }
            setTimeout(()=>{   // 함수가 모두 실행되고, 즉 이벤트 루프가 실행된 후에 스택에 다시 집어넣기 떄문에 재귀함수 무한루프에 빠지지 않을 수 있음.
                renderBlocks("retry");
                if(moveType === "top"){
                    seizeBlock();
                }
            }, 0)
            return true;   
        }
    });

    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    });
    checkMatch();
}
function checkMatch() {
    const childNodes = playgound.childNodes;
    childNodes.forEach(child=>{
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if (matched) {
            child.remove();
            prependNewLine();
            score++;
            scoreDisplay.innerText = score;
        }
    })
    generateNewBlock();
}

function generateNewBlock() {

    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top", 1)
    },duration)

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random()*blockArray.length);

    movingItem.type = blockArray[randomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}

function checkEmpty(target) {
    if(!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}
function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}
function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top",1);
    },10)
}

function showGameoverText() {
    gameText.style.display = "flex";
}


// event handling
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            changeDirection();
            break;   
        case 32:
            dropBlock();
            break;        
        default:
            break;
    }
})

restartButton.addEventListener("click",()=>{
    playgound.innerHTML = "";
    gameText.style.display = "none";
    init();
})
