// HOC 방식은 connect를 사용해서 연결한 뒤 props로 받아온다.
import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
import { increase, decrease, setDiff } from '../modules/counter';

// HOC에서는 props로 함수를 받아옵니다.
function CounterContainer({ number, diff, increase, decrease, setDiff }) {
    return (
        <Counter 
            number={number}
            diff={diff}
            onIncrease={increase}   // onIncrease={onIncrease}
            onDecrease={decrease}   // onDecrease={onDecrease}
            onSetDiff={setDiff}     // onSetDiff={onSetDiff}
        />
    );
}


// 1. useSelect와 비슷해
const mapStateToProps = (state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
})

// 2. 디스패치
const mapDispatchToProps = {
    increase,
    decrease,
    setDiff,
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);