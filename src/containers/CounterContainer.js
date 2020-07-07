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


// useSelect와 비슷해
const mapStateToProps = (state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
})

// 1. 디스패치 -> 여기서 함수 만들어서 return 하면 다시 위에서 props로 받는다.
// const mapDispatchToProps = dispatch => ({
//     onIncrease: () => dispatch(increase()),
//     onDecrease: () => dispatch(decrease()),
//     onSetDiff: (diff) => dispatch(setDiff(diff))
// })


// 2. 위 코드를 이렇게 바꿀 수 있다. 우리가 기존에 직접 하나씩 만들어서 dispatch로 감쌌는데 그 작업을 bindActionCreators가 대신함.
// const mapDispatchToProps = dispatch => bindActionCreators({
//     increase,
//     decrease,
//     setDiff,
// }, dispatch)


// 3. 그러나 함수 타입이 아니라 객체 형태라면 굳이 bindActionCreators가 connect 내부에서 이뤄짐
const mapDispatchToProps = {
    increase,
    decrease,
    setDiff,
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);