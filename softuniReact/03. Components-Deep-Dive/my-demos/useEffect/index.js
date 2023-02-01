const {useState, useEffect} = React //deconstructing when using CDN

const Demo = () => {
    const [resourceType, setResourceType] = useState('posts');
// useEffect hook is mounted onto Demo component ([] empty array is set next to cb func)
// it watches for changes of value of listed dependencies in that array
// initially, component is rendered and useEffect is executed and mounted
// if we click on posts, which is the default initial state of useState, there is no change of resourceType state
// thus, useEffect is not triggered
// if we click on commments, we update the state, useEffect watches for such changes
// and is triggered to execute console.log
    useEffect(()=>{
        console.log('resource type changed');
    }, [resourceType])

    return (
        <div>
            <div>
                <button onClick={()=>setResourceType('posts')}>Posts</button>
                {/* With JSX you pass a function as the event handler, rather than a string. */}
                <button onClick={()=>setResourceType('users')}>Users</button>
                <button onClick={()=>setResourceType('comments')}>Comments</button>
            </div>
            <h1>{resourceType}</h1>
        </div>
    )
}
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Demo />);