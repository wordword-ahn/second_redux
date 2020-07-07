import React, { useCallback } from 'react';  
import { useSelector, useDispatch } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer() {
    const todos = useSelector(state => state.todos)  // 리덕스에서 관리하는 initialState처럼 생긴 상태를 useSelector를 통해 사용
    const dispatch = useDispatch();                  // 디스패치를 받아오면 우리가 추후 액션을 디스패치할 수 있다.


    // 1. 기존 코드
    // const onCreate = text => dispatch(addTodo(text))  // 이렇게 하면 addTodo라는 액션이 발동됨
    // const onToggle = id => dispatch(toggleTodo(id));

    // 2. 수정 코드 (useCallback : 함수를 매번 렌더링 될때마다 새로 만드는 게 아니라 재사용할 수 있도록 최적화)
    const onCreate = useCallback(text => dispatch(addTodo(text)), [dispatch]);
    const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);
    

    return <Todos 
        todos={todos}
        onCreate={onCreate}
        onToggle={onToggle}
    />
}

export default TodosContainer;