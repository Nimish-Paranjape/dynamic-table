import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';

const tableRow = props => {
    let options = props.hobbies.map(hobby => {
        return {
            value: hobby
        };
    });

    let tableRow = (
        <tr>
            <td><div>{props.user.name}</div></td>
            <td><div>{props.user.gender}</div></td>
            <td><div>{props.user.hobbies.toString()}</div></td>
            <td><div>{props.user.active}</div></td>
            <td>
                <i className="fa fa-pencil" onClick={() => props.toggle(props.id)}></i>
                <i className="fa fa-trash-o" onClick={() => props.delete(props.id)}></i>
            </td>
        </tr>
    )

    if(props.user.editing) {
        tableRow = (
            <tr>
                <td>
                    <div className='edit-div'>
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
                        <Multiselect options={options} onSearch={e => props.change(props.id, e)} displayValue={'value'} onSelect={props.select} />
                    </div>
                </td>
                <td>
                    <div>
                        <input type='radio' id='yes' name='active' value='Yes' checked={props.user.active==='Yes'} onChange={e => props.change(props.id, e)}></input>
                        <label htmlFor='yes'>Yes</label>
                        <input type='radio' id='no' name='active' value='No' checked={props.user.active==='No'} onChange={e => props.change(props.id, e)}></input>
                        <label htmlFor='no'>No</label>
                    </div>
                </td>
                <td>
                    <i className="fa fa-check" onClick={() => props.update(props.id)}></i>
                    <i className="fa fa-close" onClick={() => props.toggle(props.id)}></i>
                </td>
            </tr>
        )
    }

    return tableRow;
}

export default tableRow