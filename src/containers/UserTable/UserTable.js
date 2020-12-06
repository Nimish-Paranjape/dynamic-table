import React from 'react';
import './UserTable.css';
import { connect } from 'react-redux';
import { updateData, addUser, fetchDataInit, deleteUser, updateUsersLocal } from '../../store/actions';
import TableRow from '../../components/TableRow/TableRow';
import NewRow from '../../components/NewRow/NewRow';

class UserTable extends React.Component {
    state = {
        currentlyEditing: null,
        currentlyAdding: null,
        tempArray: [],
        tempArray2: []
    }

    componentDidMount() {
        this.props.fetchDataInit({});
    }

    toggleEdit = id => {
        let currentlyEditing = {...this.state.currentlyEditing};
        let users = [...this.props.users];
        if(currentlyEditing[id]) {
            users[id].editing = false;
            delete currentlyEditing[id];
        }
        else{
            currentlyEditing[id] = {...users[id]};
            users[id].editing = true;
        }
        this.props.updateUsersLocal(users);
        this.setState({currentlyEditing: currentlyEditing});
    }

    toggleAdd = () => {
        let currentlyAdding = {
            name: '',
            gender: 'male',
            hobbies: [],
            active: ''
        };
        if(this.state.currentlyAdding)
            currentlyAdding = null;
        this.setState({currentlyAdding: currentlyAdding});
    }

    changeHandler = (id, event) => {
        let currentlyEditing = {...this.state.currentlyEditing};
        let tempArr = [...this.state.tempArray];
        if(event.target)
            currentlyEditing[id][event.target.name] = event.target.value;
        else {
            tempArr = event.split(',');
            tempArr.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
            tempArr = tempArr.filter(ele => ele!=='');
        }
        this.setState({currentlyEditing: currentlyEditing, tempArray: tempArr});
    }

    updateHandler = id => {
        let currentlyEditing = {...this.state.currentlyEditing};
        currentlyEditing[id].editing = false;
        const updatedUser = currentlyEditing[id];
        delete currentlyEditing[id];
        if(this.state.tempArray[0] || this.state.tempArray2[0])
            updatedUser.hobbies = this.state.tempArray2.concat(this.state.tempArray);
        let newHobbies = [...new Set(this.props.hobbies.concat(updatedUser.hobbies))];
        this.setState({currentlyEditing: currentlyEditing, tempArray: [], tempArray2: []});
        this.props.updateData({updatedUser: updatedUser, newHobbies: newHobbies, id: id, currentlyEditing: currentlyEditing});
    }

    deleteHandler = id => {
        let users = [...this.props.users];
        users.splice(id, 1);
        this.props.deleteUser(id);
    }

    newRowInputChangeHandler = event => {
        let currentlyAdding = {...this.state.currentlyAdding};
        let tempArr = [...this.state.tempArray];
        if(event.target)
            currentlyAdding[event.target.name] = (event.target.value).trim();
        else {
            tempArr = event.split(',');
            tempArr.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
            tempArr = tempArr.filter(ele => ele!=='');
        }
        this.setState({currentlyAdding: currentlyAdding, tempArray: tempArr});
    }

    selectedHobbyAdd = hobbiesArr => {
        let currentlyAdding = {...this.state.currentlyAdding};
        currentlyAdding.hobbies = hobbiesArr.map(ele => ele.value);
        this.setState({currentlyAdding: currentlyAdding});
    }

    selectedHobbyEdit = (hobbiesArr, id) => {
        let tempArr = []
        tempArr = hobbiesArr.map(ele => ele.value);
        this.setState({tempArray2: tempArr});
    }

    addHandler = () => {
        let newUser = {...this.state.currentlyAdding};
        newUser.hobbies = newUser.hobbies.concat(this.state.tempArray);
        let updatedHobbies = [...new Set(this.props.hobbies.concat(newUser.hobbies))];
        this.props.addUser({newUser: newUser, updatedHobbies: updatedHobbies});
        this.setState({currentlyAdding: null, tempArray: []});
    }

    render() {
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
                            {this.state.currentlyAdding ? 
                                <NewRow 
                                    inputChange={this.newRowInputChangeHandler}
                                    cancelAdd={this.toggleAdd}
                                    addRow={this.addHandler}
                                    select={this.selectedHobbyAdd} /> : null}
                            {this.props.users.map((user, index) => (
                                <TableRow
                                    hobbies={this.props.hobbies}
                                    key={index}
                                    id={index} 
                                    user={user}
                                    toggle={this.toggleEdit}
                                    update={this.updateHandler}
                                    delete={this.deleteHandler}
                                    change={this.changeHandler}
                                    select={this.selectedHobbyEdit} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn add-btn' onClick={this.toggleAdd} >Add<i className="fa fa-plus"></i></button>
            </div>
        );
    }
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