import { Component } from "react";


import React from "react";
import './App.css';
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import Card from "../components/Card";
import CardList from "../components/CardList";

class App extends Component {


    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length == 0) {
            return (
                <div className="tc">
                    <h1 className="tc f1">Loading</h1>
                </div>
            );
        }
        else {
            return (
                <div className="tc" style={{ overflow: "hidden" }}>
                    <h1 className="f1">ROBOFRIENDS</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }

}
export default App