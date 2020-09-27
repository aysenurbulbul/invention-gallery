import React from "react";
import {Container, } from "semantic-ui-react";
import UserNav from "./UserNav";

class UserPage extends React.Component{
    state = {
    };

    render() {
        return(
            <Container>
                <UserNav username = {this.props.match.params.name}/>
            </Container>

        )
    }

}

export default UserPage;