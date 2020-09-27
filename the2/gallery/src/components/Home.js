import React from "react";
import {Container, Header, Button, Grid} from "semantic-ui-react";

class Home extends React.Component{

    render() {
        return(
            <Container>
                <br/><br/><br/><br/><br/>
                <Header as='h1' textAlign = 'center'>Welcome to Invention Gallery!</Header>
                <br/><br/><br/>
                <Grid centered>
                    <Button.Group size='large'>
                        <Button secondary onClick={e =>  window.location.href='/adduser'}>Add User</Button>
                        <Button.Or/>
                        <Button secondary onClick={e =>  window.location.href='/deleteuser'}>Delete User</Button>
                        <Button.Or/>
                        <Button secondary onClick={e =>  window.location.href='/login'}>Login</Button>
                    </Button.Group>
                </Grid>
            </Container>
        )
    }

}

export default Home;