import React from 'react';
import './UserTable.css';
import { connect } from 'react-redux';
import { updateData, addUser, fetchDataInit, deleteUser, updateUsersLocal } from '../../store/actions';
import TableRow from '../../components/TableRow/TableRow';
import NewRow from '../../components/NewRow/NewRow';

class UserTable extends React.Component {
    state = {
        currentlyEditing: null,
        currentlyAdding: null
    }

    componentDidMount() {
        console.log('executed...');
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
            hobbies: '',
            active: ''
        };
        if(this.state.currentlyAdding)
            currentlyAdding = null;
        this.setState({currentlyAdding: currentlyAdding});
    }

    changeHandler = (id, event) => {
        let currentlyEditing = {...this.state.currentlyEditing};
        currentlyEditing[id][event.target.name] = event.target.value;
        console.log(currentlyEditing);
        this.setState({currentlyEditing: currentlyEditing});
    }

    updateHandler = id => {
        let currentlyEditing = {...this.state.currentlyEditing};
        currentlyEditing[id].editing = false;
        const updatedUser = currentlyEditing[id];
        delete currentlyEditing[id];
        let hobbies = updatedUser.hobbies.split(',');
        hobbies.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
        let newHobbies = [...new Set(this.props.hobbies.concat(hobbies))];
        this.props.updateData({updatedUser: updatedUser, newHobbies: newHobbies, id: id, currentlyEditing: currentlyEditing});
        this.setState({currentlyEditing: currentlyEditing});
    }

    deleteHandler = id => {
        let users = [...this.props.users];
        users.splice(id, 1);
        this.props.deleteUser(id);
    }

    newRowInputChangeHandler = event => {
        let currentlyAdding = {...this.state.currentlyAdding};
        currentlyAdding[event.target.name] = event.target.value;
        this.setState({currentlyAdding: currentlyAdding});
    }

    addHandler = () => {
        let newUser = {...this.state.currentlyAdding};
        let hobbies = [];
        hobbies = newUser.hobbies.split(',');
        hobbies.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
        let updatedHobbies = [...new Set(this.props.hobbies.concat(hobbies))];
        this.props.addUser({newUser: newUser, updatedHobbies: updatedHobbies});
        this.setState({currentlyAdding: null});
    }

    render() {
        return (
            <div className='container-div'>
                <div className='user-table'>
                    <table>
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
                                    list={this.props.hobbies}/> : null}
                            {this.props.users.map((user, index) => (
                                <TableRow
                                    key={index}
                                    id={index} 
                                    user={user}
                                    toggle={this.toggleEdit}
                                    update={this.updateHandler}
                                    delete={this.deleteHandler}
                                    change={this.changeHandler}
                                    list={this.props.hobbies} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn add-btn' onClick={this.toggleAdd}>Add</button>
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