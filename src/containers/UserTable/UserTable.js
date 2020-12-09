import React, { useEffect, useState } from 'react';
import './UserTable.css';
import { connect } from 'react-redux';
import { updateData, addUser, fetchDataInit, deleteUser, updateUsersLocal } from '../../store/actions';
import TableRow from '../../components/TableRow/TableRow';
import NewRow from '../../components/NewRow/NewRow';

const UserTable = props => {

    const [currentlyEditing, setCurrentlyEditing] = useState({});
    const [currentlyAdding, setCurrentlyAdding] = useState(null);
    const [tempArrays, setTempArrays] = useState({tempArray: [], tempArray2: []});

    useEffect(() => {
        props.fetchDataInit({});
    }, []);

    const toggleEdit = id => {
        let updatedObj = {...currentlyEditing};
        let users = [...props.users];
        if(updatedObj[id]) {
            users[id].editing = false;
            delete updatedObj[id];
        }
        else{
            updatedObj[id] = {...users[id]};
            users[id].editing = true;
        }
        props.updateUsersLocal(users);
        setCurrentlyEditing(updatedObj);
    }

    const toggleAdd = () => {
        if(currentlyAdding)
            return setCurrentlyAdding({});
        setCurrentlyAdding({
            name: '',
            gender: 'male',
            hobbies: [],
            active: ''
        });
    }

    const changeHandler = (id, event) => {
        let updatedObject = {...currentlyEditing};
        let tempArr = [...tempArrays.tempArray];
        if(event.target)
            updatedObject[id][event.target.name] = event.target.value;
        else {
            tempArr = event.split(',');
            tempArr.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
            tempArr = tempArr.filter(ele => ele!=='');
        }
        setCurrentlyEditing(updatedObject);
        setTempArrays({...tempArrays, tempArray:tempArr});
    }

    const updateHandler = id => {
        let updatedObject = {...currentlyEditing};
        updatedObject[id].editing = false;
        let updatedUser = updatedObject[id];
        delete updatedObject[id];
        if(tempArrays.tempArray[0] || tempArrays.tempArray2[0])
            updatedUser.hobbies = tempArrays.tempArray2.concat(tempArrays.tempArray);
        let newHobbies = [...new Set(props.hobbies.concat(updatedUser.hobbies))];
        setCurrentlyEditing(updatedObject);
        setTempArrays({tempArray: [], tempArray2: []});
        props.updateData({updatedUser: updatedUser, newHobbies: newHobbies, id: id, currentlyEditing: updatedObject});
    }

    const deleteHandler = id => {
        let users = [...props.users];
        users.splice(id, 1);
        props.deleteUser(id);
    }

    const newRowInputChangeHandler = event => {
        let updatedObj = {...currentlyAdding};
        let tempArr = [...tempArrays.tempArray];
        if(event.target)
            updatedObj[event.target.name] = (event.target.value).trim();
        else {
            tempArr = event.split(',');
            tempArr.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
            tempArr = tempArr.filter(ele => ele!=='');
        }
        setCurrentlyAdding(updatedObj);
        setTempArrays({...tempArrays, tempArray: tempArr});
    }

    const selectedHobbyAdd = hobbiesArr => {
        let updatedObj = {...currentlyAdding};
        updatedObj.hobbies = hobbiesArr.map(ele => ele.value);
        setCurrentlyAdding(updatedObj);
    }

    const selectedHobbyEdit = (hobbiesArr, id) => {
        let tempArr = []
        tempArr = hobbiesArr.map(ele => ele.value);
        setTempArrays({...tempArrays, tempArray2: tempArr});
    }

    const addHandler = () => {
        let newUser = {...currentlyAdding};
        newUser.hobbies = newUser.hobbies.concat(tempArrays.tempArray);
        let updatedHobbies = [...new Set(props.hobbies.concat(newUser.hobbies))];
        props.addUser({newUser: newUser, updatedHobbies: updatedHobbies});
        setCurrentlyAdding(null);
        setTempArrays({...tempArrays, tempArray: []});
    }

    return (
        <div className='container-div'>
            <div className='table-div'>
                <table className='user-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Hobbies</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentlyAdding ? 
                            <NewRow 
                                inputChange={newRowInputChangeHandler}
                                cancelAdd={toggleAdd}
                                addRow={addHandler}
                                select={selectedHobbyAdd} /> : null}
                        {props.users.map((user, index) => (
                            <TableRow
                                hobbies={props.hobbies}
                                key={index}
                                id={index} 
                                user={user}
                                toggle={toggleEdit}
                                update={updateHandler}
                                delete={deleteHandler}
                                change={changeHandler}
                                select={selectedHobbyEdit} />
                        ))}
                    </tbody>
                </table>
            </div>
            <button className='btn add-btn' onClick={toggleAdd} >Add<i className="fa fa-plus"></i></button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users,
        hobbies: state.hobbies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDataInit: editing => dispatch(fetchDataInit(editing)),
        addUser: updatedObj => dispatch(addUser(updatedObj)),
        updateData: updatedObj => dispatch(updateData(updatedObj)),
        deleteUser: id => dispatch(deleteUser(id)),
        updateUsersLocal: users => dispatch(updateUsersLocal(users))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);