// REACT
//const App = (props) => {
//    const { name, value } = props;
//        alert('123')
//    return (
//        <div>
//            <h3>{name}</h3>
//            <br />
//            <p>{value}</p>
//        </div>
//    );
//};



define([
    'react',
], (React) => {
    const App = (props) => React.createElement('div', {}, props.name + ' - ' + props.value);

    return App;
});