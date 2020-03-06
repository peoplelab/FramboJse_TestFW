
// cookie handler
const getDataFromCookie = () => {
    const [framboCookie] = document.cookie.split(/;/);
    const [key, value] = framboCookie.split(/=/);
    const jsonVal = JSON.parse(value);
    const data = jsonVal.result;

    return { key, data };
};

// data list
const cookiesList = cookie => cookie.split(/;/g).map((item) => {
    const [key, value] = item.split(/=/);

    return (
        <li key={key}>
            <b>{key}</b> {value}
        </li>
    );
});

// main component
const App = (props) => {
    const obj = React.useMemo(() => getDataFromCookie());
    const List = React.useMemo(() => cookiesList(obj.data), [obj]);

    return (
        <div>
            <h1>Test integrazione React con Yeap (pure React)</h1>
            <br />
            <div>{document.cookie}</div>
            <br />
            <p>{obj.key}</p>
            <ul>
                {List}
            </ul>
        </div>
    );
};



// render react app
const container = document.getElementById('root');
ReactDOM.render(<App />, container);
