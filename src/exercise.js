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

const store = createStore(reducer);
console.log(store.getState());


// 구독
const listener = () => {
    const state = store.getState();
    console.log(state);
}

// 구독 해제
const unsubscribe = store.subscribe(listener);
// unsubscribe();  // 구독해제


// 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕'));
store.dispatch(addToList({id:1, text: 'ㅇㅇ'}));