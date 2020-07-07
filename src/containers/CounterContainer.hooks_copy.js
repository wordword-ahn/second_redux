import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';  // useSelector: 상태를 조회, useDispatch: 액션을 만들고 이를 디스패치
import { increase, decrease, setDiff } from '../modules/counter';


function CounterContainer() {

    // useSelector: 상태를 조회 (state가 가리키는 것: 우리가 만든 스토어에서 store.getState() 했을 때 반환하는 객체)
    const { number, diff } = useSelector(state => ({   // 비구조화 할당
        number: state.counter.number,
        diff: state.counter.diff
    }), shallowEqual)  // shallowEqual: 리렌더링 방지해서 최적화시키려고 추가된 키워드 (없어도 잘 작동함) -> 아니면 키워드마다 따로 useSelector를 해주는 방법도 존재

    // 우리는 언제든 dispatch를 사용해서 특정 액션을 발생시킬 수 있다
    const dispatch = useDispatch();
    const onIncrease = () => dispatch(increase());  // 모듈에서 불러온다
    const onDecrease = () => dispatch(decrease());  // 모듈에서 불러온다
    const onSetDiff = diff => dispatch(setDiff(diff));

    return (
        <Counter 
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

export default CounterContainer;