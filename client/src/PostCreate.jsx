import  { useState } from "react";
import axios from 'axios'
const PostCreate = ()=>{
    const [title,setTitle] = useState('')
    const onSubmit = async(event)=>{
        event.preventDefault();

        await axios.post('http://localhost:4000/posts',{
            title
        });
        setTitle('')
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} className="form-control" onChange={e => setTitle(e.target.value)} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default PostCreate