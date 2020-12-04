import React from 'react';
import TableRow from '../../components/TableRow/TableRow'

class UserTable extends React.Component {
    state = {
        users: [
            {name: 'Female1', gender: 'female', hobbies: 'reading', active: 'No', editing: false},
            {name: 'Female2', gender: 'female', hobbies: 'music', active: 'Yes', editing: false},
            {name: 'Female3', gender: 'female', hobbies: 'pilates', active: 'Yes', editing: false}
        ],
        currentlyEditing: [],
        hobbies: ['dancing']
    }

    toggleEdit = id => {
        let currentlyEditing = [...this.state.currentlyEditing];
        let users = [...this.state.users];
        users[id].editing  = !users[id].editing;
        console.log(users[id]);
        if(currentlyEditing[id]){
            currentlyEditing[id] = undefined;
        }
        else
            currentlyEditing[id] = {...users[id]};
        this.setState({users: users, currentlyEditing: currentlyEditing});
    }

    changeHandler = (id, event) => {
        let currentlyEditing = [...this.state.currentlyEditing];
        console.log(event.target.name, '---', event.target.value);
        currentlyEditing[id][event.target.name] = event.target.value;
        this.setState({currentlyEditing: currentlyEditing});
    }

    updateHandler = id => {
        let currentlyEditing = [...this.state.currentlyEditing];
        let users = [...this.state.users];
        let hobbies = [];
        currentlyEditing[id].editing = false;
        users[id] = currentlyEditing[id];
        currentlyEditing[id] = undefined;
        hobbies = users[id].hobbies.split(',');
        hobbies.forEach((ele, index, arr) => arr[index] = ele.trim().toLowerCase());
        let updatedHobbies = [...new Set(this.state.hobbies.concat(hobbies))];
        console.log(updatedHobbies);
        this.setState({users: users, currentlyEditing: currentlyEditing, hobbies: updatedHobbies});
    }

    deleteHandler = id => {
        let users = [...this.state.users];
        let currentlyEditing = [...this.state.currentlyEditing];
        users.splice(id, 1);
        currentlyEditing.splice(id, 1);
        this.setState({users: users});
    }

    render() {
        console.log(this.state.currentlyEditing);
        return (
            <div>
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
                        {this.state.users.map((user, index) => (
                            <TableRow
                                key={index}
                                id={index} 
                                user={user}
                                toggle={this.toggleEdit}
                                update={this.updateHandler}
                                delete={this.deleteHandler}
                                change={this.changeHandler}
                                list={this.state.hobbies} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserTable