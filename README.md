## 지난번 redux와의 차이점
- 저번에 만든건 HOC이라는 옛날 패턴으로 connect를 사용한다.
- HOC는 재사용되는 값, 함수를 Props로 받아올 수 있게 해주는 옛날 패턴이다.
- 클래스형에서는 connect로만 연결이 가능하지만 함수형 컴포넌트에서는 주로 HOOK을 사용한다.


## 시작
    npx create-react-app 프로젝트이름
    yarn add redux
    yarn add react-redux

----- 
<br><br>

## 목차
1. modules 폴더 (파일 3개)
2. Provider와 createStore

<br><br>

-----

## 기본 예제 파일 (exercise.js)

        import { createStore } from 'redux';

<br>
// 초기값

        const initialState = {
            counter: 0,
            text: '',
            list: []
        };


<br>
// 액션 타입 정의

        const INCREASE = 'INCREASE';
        const DECREASE = 'DECREASE';
        const CHANGE_TEXT = 'CHANGE_TEXT';
        const ADD_TO_LIST = 'ADD_TO_LIST';


<br>
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


<br>
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


<br>
// 스토어

        const store = createStore(reducer);
        console.log(store.getState());  // store.getState()를 콘솔로 찍어보면 초기값이 잘 나온 것을 알 수 있다.



<br>
// 구독

        const listener = () => {
            const state = store.getState();
            console.log(state);
        }

<br>
// 구독 해제

        const unsubscribe = store.subscribe(listener);
        // unsubscribe();  // 구독해제


<br>
// 디스패치

        store.dispatch(increase());
        store.dispatch(decrease());
        store.dispatch(changeText('안녕'));
        store.dispatch(addToList({id:1, text: 'ㅇㅇ'}));



<br><br>

----- 

## 1. src/modules 폴더 속 파일 3개

<전체 흐름>
1. 맨 처음에 src 폴더에 modules 폴더를 만든다.
2. src/modules 폴더 안에 counter.js, todos.js 파일 2개를 만든다.
3. src/modules 폴더 안에 index.js 파일을 만들어서 위에서 만든 파일 2개를 연결한다.      
<br><br>


#### src/modules/counter.js

        // 초기값
        const initialState = {
            number: 0,
            diff: 1
        };


<br>
// 액션 타입 정의   (중복을 막기 위해 앞에 counter를 붙임)

        const SET_DIFF = 'counter/SET_DIFF';
        const INCREASE = 'counter/INCREASE';
        const DECREASE = 'counter/DECREASE';

<br>
// 리듀서 작성

        export default function counter(state = initialState, action) {
            switch (action.type) {
                case SET_DIFF:
                    return {
                        ...state,
                        diff: action.diff,
                    };

                case INCREASE:
                    return {
                        ...state,
                        number: state.number + state.diff
                    };

                case DECREASE:
                    return {
                        ...state,
                        number: state.number - state.diff
                    }

                default:
                    return state;
            }
        }


<br><br>

#### src/modules/todos.js

        // 초기값
        const initialState = [

        ];

<br>
// 액션 타입 정의

        const ADD_TODO = 'todos/ADD_TODO';
        const TOGGLE_TODO = 'todos/TOGGLE_TODO'


<br>
// 액션 생성 함수

        let nextId = 1;
        export const addTodo = (text) => ({
            type: ADD_TODO,
            todo: {
                id: nextId++,
                text
            }
        });

        export const toggleTodo = id => ({
            type: TOGGLE_TODO,
            id
        })

<br>
// 리듀서 작성

        export default function todos(state = initialState, action) {
            switch (action.type) {
                case ADD_TODO:
                    return state.concat(action.todo)
                case TOGGLE_TODO:
                    return state.map(
                        todo => todo.id === action.id
                        ? { ...todo, done: !todo.done }
                        : todo
                    )
                default:
                    return state;
            }
        }

<br><br>

#### src/modules/index.js

        import { combineReducers } from 'redux';
        import counter from './counter';
        import todos from './todos';

        // combineReducers로 합쳐준다.
        const rootReducer = combineReducers({
            counter,
            todos
        })

        export default rootReducer;

여기서 combineReducers를 사용하여 2개의 리듀서를 합치고 있다.
<br>
<br>

-----

## 2. Provider와 createStore

src/index.js을 보면 아래 구간이 있다.

    ReactDOM.render(	
        <React.StrictMode>	
            <App />	
        </React.StrictMode>,	

        document.getElementById('root')	
    );	

<br>

이 구간을 다음과 같이 수정해준다.

    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    import rootReducer from './modules'  // modules의 index.js라는 이름으로 rootReducer를 내보냄

    const store = createStore(rootReducer);
    console.log(store.getState());      // 잘 되는지 확인


    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );

rootReducer에서 맨 처음 작성한 modules 파일을 넣어주고 있다.

<br> <br>

-----

## 3. 







<br>

## Provider
react-redux 라이브러리에 내장되어 있음.     
리액트 앱에 store를 손쉽게 연동할 수 있도록 도와주는 컴포넌트


## components 폴더
프리젠테이션 컴포넌트 : redux 스토어에 직접 접근하지 않고 필요한 값/함수를 props로만 받아와서 사용하는 컴포넌트. 주로 UI만 표현한다.


## containers 폴더
컨테이너 컴포넌트란 리액스에 있는 상태를 조회하거나 액션을 디스패치할 수 있는 컴포넌트를 의미.


## 정리
#### 리덕스 스토어 -> 컨테이너 컴포넌트 -> 프리젠테이셔널 컴포넌트
프리젠테이셔널 컴포넌트는 단순히 UI만 선언하고,         
상태관리는 컨테이너 컴포넌트에 맡긴다.      

컨테이너 컴포넌트 <- 리덕스 스토어 (스토어의 현재 상태를 줌)
컨테이너 컴포넌트 -> 리덕스 스토어 (액션 디스패치)