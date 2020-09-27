import React from "react";
import {Container, Header, Divider, Item, Rating} from "semantic-ui-react";
import UserNav from "./UserNav";
import axios from "axios";

class InventionPage extends React.Component{
    state = {
        invention : [],
        defrate : 0,
        rating : 0,
        user : []
    };

    componentDidMount() {
        this.getProduct();
        this.getOldRate();
    };


    getProduct = () => {
        let url = '/api/productdetail/' + this.props.match.params.product;
        //console.log(url);
        axios.get(url)
            .then((response) => {
                //console.log('go agane')
                //console.log(response.data);
                this.setState({invention : response.data[0]});
                this.getOldRate();
                //console.log(this.state.invention)
            })
            .catch((error) => {
                console.log(error.message)
            })
    };

    //not working now
    getOldRate = () => {
        //console.log('oldrate');
        let url = '/api/ratedbefore/' + this.props.match.params.name + '/' + this.props.match.params.product;
        axios.get(url)
            .then((response) => {
                //console.log(response.data)
                if(response.data.length){
                    //console.log('got an idea');
                    this.setState({defrate : response.data[0].rating});
                }
                else{
                    //console.log('never seen this dude');
                    this.setState({defrate : 0})
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    };

    formatDate = (str) => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(str).toLocaleDateString(['en-GB'],options);
    };

    renewRate = () => {
        // call from child to usernav later
        console.log('******************')
        this.getProduct();
    };

    callRate = () => {
        let url = '/api/inventions/' + this.props.match.params.name + '/' + this.props.match.params.product;
        axios.put(url, {
            rater : this.props.match.params.name,
            product_name : this.state.invention.product_name,
            inventor : this.state.invention.inventor,
            rating : this.state.rating,
        }).then((res) => {
            if(res.status===200){
                console.log('we good')
            }
        }).catch((err) => {
            console.log(err.message());
        });
    };

    handleRate = async (e, { rating}) => {
        await this.setState({ rating });
        //console.log(this.state);
        this.callRate();
        this.renewRate();
        window.location.reload();
    };


    render() {
        return(
            <Container>
                <UserNav username = {this.props.match.params.name}/>
                <br/><br/><br/>
                <Header as = 'h2' >Product Name: {this.props.match.params.product}</Header>
                <Divider/>
                <Item.Group link>
                    <Item>
                        <Item.Image size='large' src={this.state.invention.photo} />

                        <Item.Content>
                            <Item.Header>Inventor: {this.state.invention.inventor}</Item.Header>
                            <br/><br/>
                            <Item.Description>
                                <strong>Post Date: </strong> {this.state.invention.date?this.formatDate(this.state.invention.date):""}<br/><br/>
                                <strong>Rating: </strong> {this.state.invention.rating}<br/><br/>
                                <strong>Materials: </strong> {this.state.invention.materials}<br/><br/>
                                <strong>Cost: </strong>{this.state.invention.cost}<br/><br/>
                                {this.state.invention.optionals
                                    ?
                                    <strong>{this.state.invention.optionals.name1.length
                                        ? (this.state.invention.optionals.name1 + ':')
                                        : ''} </strong> : ''
                                }
                                {this.state.invention.optionals
                                    ?
                                    this.state.invention.optionals.val1:''
                                }
                                <br/><br/>
                                {this.state.invention.optionals
                                    ?
                                    <strong>{this.state.invention.optionals.name2.length
                                        ? (this.state.invention.optionals.name2 + ':')
                                        : ''} </strong>
                                    : ''
                                }
                                {this.state.invention.optionals
                                    ?
                                    this.state.invention.optionals.val2:''
                                }

                                <br/><br/>
                                <strong>Rate the product:</strong><br/><br/>
                                <Rating icon='star' defaultRating={this.state.defrate} maxRating={5} onRate={this.handleRate} size='huge'/>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Container>
        )
    }

}

export default InventionPage;