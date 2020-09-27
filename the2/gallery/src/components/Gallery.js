import React from "react";
import {Container, Card, Button, Image, Header, Divider} from "semantic-ui-react";
import axios from 'axios';
import UserNav from "./UserNav";

class Gallery extends React.Component{
    state = {
      inventions : [],
    };

    componentDidMount() {
        axios.get('/api/products')
            .then((response) => {
                //console.log(response.data);
                this.setState({inventions : response.data})
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    render() {
        let id = 0;
        let inventions = this.state.inventions.map(invention => {
            return(
                <Card key = {id++}>
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={invention.photo}
                        />
                        <Card.Header>{invention.product_name}</Card.Header>
                        <Card.Meta>Inventor: {invention.inventor}</Card.Meta>
                        <Card.Description>
                            {invention.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                            <Button
                                secondary
                                onClick={e =>  {window.location.href='/invention/'+this.props.match.params.name+'/'+invention.product_name;}}
                            >
                                Take a Look!
                            </Button>
                    </Card.Content>
                </Card>
            );
        });

        return(
            <Container>
                <UserNav username = {this.props.match.params.name}/>
                <br/><br/><br/>
                <Header as='h2'>Gallery</Header>
                <Divider/>
                <Card.Group>
                    {inventions}
                </Card.Group>
            </Container>
        )
    }

}

export default Gallery;