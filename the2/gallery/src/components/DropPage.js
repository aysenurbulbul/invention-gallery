import React from "react";
import {Button, Card, Container, Divider, Header, Image,} from "semantic-ui-react";
import UserNav from "./UserNav";
import axios from "axios";

class DropPage extends React.Component{
    state = {
        inventions : []
    };

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        axios.get('/api/products/' + this.props.match.params.name)
            .then((response) => {
                //console.log(response.data);
                this.setState({inventions : response.data})
            })
            .catch((error) => {
                console.log(error.message)
            })
    };

    handleDrop = (e) => {
        let url = '/api/dropproduct/' + e.target.id;
        axios.put(url)
            .then((res) => {
                //console.log(res)
                this.getProducts() //to refresh
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    handleExhibit = (e) => {
        let url = '/api/exhibitproduct/' + e.target.id;
        axios.put(url)
            .then((res) => {
                //console.log(res)
                this.getProducts() //to refresh
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

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
                        {invention.exhibit?<Button
                        secondary
                        onClick={this.handleDrop}
                        id = {invention._id}
                    >
                        Drop from gallery
                    </Button>:<Button
                        secondary
                        onClick={this.handleExhibit}
                        id = {invention._id}
                    >
                        Dropped, Exhibit Again
                    </Button>}

                    </Card.Content>
                </Card>
            );
        });

        return(
            <Container>
                <UserNav username = {this.props.match.params.name}/>
                <br/><br/><br/>
                <Header as='h2'>Your Inventions</Header>
                <Divider/>
                <Card.Group>
                    {inventions}
                </Card.Group>
            </Container>
        )
    }

}

export default DropPage;