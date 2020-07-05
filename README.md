## 시작
    npx create-react-app 프로젝트이름
    yarn add redux
    yarn add react-redux


## 처음 연습
#### 액션 타입 정의, 액션 생성 함수, 리듀서 작성, 스토어 생성
1. 맨 처음에 exercise.js라는 파일을 만든다.
2. index.js 파일에 import './exercise';를 추가한다.
3. index.js 파일에서 console.log("ㅎㅇ")를 넣은 뒤 npm start로 확인해보면 잘 찍힌다는 것을 알 수 있다.
4. 이런 식으로 파일을 연결한 뒤 작업을 시작한다.


        import { createStore } from 'redux';


        // 초기값
        const initialState = {
            counter: 0,
            text: '',
            list: []
        };


        // 액션 타입 정의
        const INCREASE = 'INCREASE';
        const DECREASE = 'DECREASE';
        const CHANGE_TEXT = 'CHANGE_TEXT';
        const ADD_TO_LIST = 'ADD_TO_LIST';


        // 액션 생성 함수
        const increase = () => ({
            type: INCREASE,
        });

        const decrease = () => ({
            type: DECREASE,
        });

        const changeText = text => ({
            type: CHANGE_TEXT,
            text
        });

        const addToList = item => ({
            type: ADD_TO_LIST,
            item
        });


        // 리듀서 작성
        function reducer(state = initialState, action) {
            switch (action.type) {
                case INCREASE:
                    return {
                        // 기존 상태의 counter 값을 읽어서 1을 더하고 기존 값은 유지시키고 반환
                        ...state,
                        counter: state.counter + 1,
                    };

                case DECREASE:
                    return {
                        ...state,
                        counter: state.counter - 1
                    }

                    case CHANGE_TEXT:
                        return {
                            ...state,
                            text: action.text
                        }

                    case ADD_TO_LIST:
                        return {
                            ...state,
                            list: state.list.concat(action.item)  // 기존의 list에 새로운 item을 추가한 새로운 배열을 만들어서 기존의 list를 대체시켜줌
                        }

                default:
                    return state;
            }
        }


        // 스토어 생성
        const store = createStore(reducer);
        console.log(store.getState());


마지막에 store.getState()를 콘솔로 찍어보면 초기값이 잘 나온 것을 알 수 있다.


#