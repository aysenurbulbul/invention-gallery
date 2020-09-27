import React from "react";
import {Container, Header, Icon, Label, Image, Grid, Button} from "semantic-ui-react";
import axios from 'axios';

class UserNav extends React.Component{
    state = {
        user : []
    };

    componentDidMount() {
        axios.get('/api/user/'+ this.props.username)
            .then((res) => {
                //console.log(res.data)
                this.setState({user:res.data[0]});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }


    render() {
        return(
            <Container>
                <br/><br/><br/>
                <Grid columns={5} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h2'>Username</Header>
                            <Label as='a' onClick={e =>  {window.location.href='/users/'+this.props.username;}}>
                                <Image avatar spaced='right' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                {this.state.user.username}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2'>Average Rating</Header>
                            <Button><Icon name='star'/>{this.state.user.avg_rating}</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2'>Exhibit</Header>
                            <Button onClick={e =>  {window.location.href='/exhibit/'+this.props.username;}}><Icon name='add'/>Add invention</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2'>Drop</Header>
                            <Button onClick={e => {window.location.href='/drop/'+this.props.username;}}><Icon name='trash'/>Drop invention</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as='h2'>Rate</Header>
                            <Button onClick={e => {window.location.href='/gallery/'+this.props.username;}}><Icon name='images'/>Go to Gallery</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

        )
    }

}

export default UserNav;