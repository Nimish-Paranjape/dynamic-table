import React from 'react';

const tableRow = props => {
    let tableRow = (
        <tr>
            <td><div>{props.user.name}</div></td>
            <td><div>{props.user.gender}</div></td>
            <td><div>{props.user.hobbies}</div></td>
            <td><div>{props.user.active}</div></td>
            <td>
                <button onClick={() => props.toggle(props.id)}>Edit</button>
                <button onClick={() => props.delete(props.id)}>Delete</button>
            </td>
        </tr>
    )

    if(props.user.editing) {
        tableRow = (
            <tr>
            <td>
                <div>
                    <input 
                        defaultValue={props.user.name} 
                        name='name' 
                        onChange={(e) => props.change(props.id, e)}></input>
                </div>
            </td>
            <td>
                <div>
                    <select name='gender' onChange={e => props.change(props.id, e)} defaultValue={props.user.gender}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
            </td>
            <td>
                <div>
                    <input  
                        list='list'
                        name='hobbies'
                        onChange={(e) => props.change(props.id, e)}></input>
                    <datalist id='list'>
                        {props.list.map((hobby, index) => (
                            <option value={hobby} key={index}/>
                        ))}
                    </datalist>
                </div>
            </td>
            <td>
                <div>
                    <input type='radio' id='yes' name='active' value='Yes' onChange={e => props.change(props.id, e)}></input>
                    <label htmlFor='yes'>Yes</label>
                    <input type='radio' id='no' name='active' value='No' onChange={e => props.change(props.id, e)}></input>
                    <label htmlFor='no'>No</label>
                </div>
            </td>
            <td>
                <button onClick={() => props.update(props.id)}>Update</button>
                <button onClick={() => props.toggle(props.id)}>Cancel</button>
            </td>
        </tr>
        )
    }

    return tableRow;
}

export default tableRow;