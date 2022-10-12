## 테트리스 게임 [Tetris]

### Vanilla JS 미니 프로젝트

source : [추억의 게임! 테트리스 HTML, Javascript로 만들기
](https://www.youtube.com/watch?v=1lNy2mhvLFk)


## 실행

<img width="1470" alt="Screen Shot 2022-10-12 at 3 06 40 PM" src="https://user-images.githubusercontent.com/96857599/195263488-54022f9a-6946-4059-ab96-19aa8b5273c8.png">


## Gameover

<img width="1470" alt="Screen Shot 2022-10-12 at 3 04 26 PM" src="https://user-images.githubusercontent.com/96857599/195263507-cffdcd6b-b800-4cd6-a74b-29c203cf6945.png">


## 코드 설명

1. init 함수 실행 시, 블럭의 타입, 방향, 좌표를 저장한 변수를 임시 저장한다.
<img width="455" alt="Screen Shot 2022-10-12 at 3 13 47 PM" src="https://user-images.githubusercontent.com/96857599/195264163-75a27882-3dd1-4a21-8350-b739d1e51512.png">

2. prependNewLine 함수는 테트리스의 칸을 초기화해준다.
<img width="388" alt="Screen Shot 2022-10-12 at 3 14 59 PM" src="https://user-images.githubusercontent.com/96857599/195264367-4e97fba8-a7db-483f-b04e-aa29d5a3f9d8.png">

3. generateNewBlock 함수는 하나의 블럭의 움직임이 종료되면 다음 블럭을 생성해준다.
이때, 초기 변수값 duration의 속도로 블럭이 y축으로 1칸씩 움직이게 설정한다.
BLOCKS 파일에 저장된 블럭의 유형을 랜덤으로 선정하여 movingItem에 저장하고 블럭의 초기값을 tempMovingItem에 저장한다. 이후 renderBlocks 함수로 블럭의 생성 및 움직임을 제어한다.
<img width="510" alt="Screen Shot 2022-10-12 at 3 22 08 PM" src="https://user-images.githubusercontent.com/96857599/195265412-61c575e6-ac56-4eb6-9c29-1ed8d256845e.png">

4. 


