import React, { useState } from 'react';

// todo: 리덕스 모듈에서 관리하는 (initState처럼 생긴) 객체가 여기로 들어온다 (id, text, done)
function TodoItem({ todo, onToggle }) {
    return (
        <li 
            style={{
                textDecoration: todo.done ? 'line-through' : 'none'  // true면 줄긋기
            }}
            onClick={() => onToggle(todo.id)}  // 클릭되면 todo가 갖고 있는 id값을 넣어서 onToggle 호출
        >
            {todo.text}
        </li>
    )
}


// 여러개의 항목들을 보여줌
function TodoList({ todos, onToggle }) {
    return (
        <ul>
            {
                todos.map(todo => <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                />
                )
            }
        </ul>
    )
}

// todos: 여러개의 todo가 들어있는 배열, onCreate: 새로운 할일 항목을 등록해주게 하는 함수
function Todos({ todos, onCreate, onToggle }) {
    const [text, setText] = useState('');  // 필요한 경우 리덕스가 아니라 내부에서 처리
    const onChange = e => setText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();  // 새로고침 방지
        onCreate(text);
        setText('');  // 초기화
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={text}
                    onChange={onChange}
                    placeholder="할일 입력"
                />
                <button>등록</button>
            </form>
            <TodoList
                todos={todos}
                onToggle={onToggle}
            />
        </div>
    )
}

export default Todos;