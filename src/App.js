import React, { Component } from 'react';
import './App.css';
import profiles from './profiles.json';
import Wrapper from './components/Wrapper';
import Nav from './components/Nav';
import Title from './components/Title';
import Card from './components/Card';

class App extends Component {
    // init state
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        profiles: profiles,
        unselectedProfiles: profiles
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectCard = name => {
        const findProfile = this.state.unselectedProfiles.find(item => item.name === name);

        if(findProfile === undefined) {
            // wrong selection
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                profiles: profiles,
                unselectedProfiles: profiles
            });
        }
        else {
            // correct selection
            const newProfiles = this.state.unselectedProfiles.filter(item => item.name !== name);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                profiles: profiles,
                unselectedProfiles: newProfiles
            });
        }

        this.shuffleArray(profiles);
    };

    render() {
        return (
            <Wrapper>
                <Nav
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.profiles.map(profile => (
                        <Card
                            name={profile.name}
                            image={profile.image}
                            selectProfile={this.selectProfile} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;

