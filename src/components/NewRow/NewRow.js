import React from 'react';

const newRow = props => (
    <tr>
        <td>
            <div>
                <input
                    name='name'
                    onChange={e => props.inputChange(e)}></input>
            </div>
        </td>
        <td>
            <div>
                <select name='gender' onChange={e => props.inputChange(e)} defaultValue='male'>
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
                    onChange={e => props.inputChange(e)}></input>
                <datalist id='list'>
                    {props.list.map((hobby, index) => (
                        <option value={hobby} key={index} />
                    ))}
                </datalist>
            </div>
        </td>
        <td>
            <div>
                <input type='radio' id='yes' name='active' value='Yes' onChange={e => props.inputChange(e)}></input>
                <label htmlFor='yes'>Yes</label>
                <input type='radio' id='no' name='active' value='No' onChange={e => props.inputChange(e)}></input>
                <label htmlFor='no'>No</label>
            </div>
        </td>
        <td>
            <i className="fa fa-check" onClick={props.addRow}></i>
            <i className="fa fa-close" onClick={props.cancelAdd}></i>
        </td>
    </tr>
);

export default newRow;