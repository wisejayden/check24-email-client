import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MainView from './MainView';
import NavigationSection from './NavigationSection';
import './App.css';
import allMessages from '../messages.json';
import moment from 'moment';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            dropdownValue: 'date',
            mainMessage: 'Select an article from the left'
        };
        this.navigationSectionClickToMain = this.navigationSectionClickToMain.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.dropdownHandleChange = this.dropdownHandleChange.bind(this);
        this.sortArticles = this.sortArticles.bind(this);
    }
    //Before mounting, retrieve data from API Call.
    componentWillMount() {
        allMessages.messages.forEach((message) => {
            message.unread = "true";
        });
        this.setState({
            allMessages
        })
    }
    //When clicking on the Delete icon in the Navigation Section, remove that index from the messages array.
    deleteMessage(e) {
        e.stopPropagation();
        const mainViewIndex = this.state.currentMainView;
        const allMessages = this.state.allMessages;

        allMessages.messages.splice(e.target.name, 1);
        this.setState({
            allMessages
        })
        //If user currently has email opened in the Main View, remove from state.
        if(mainViewIndex[1] == e.target.name) {
            let mainMessage = this.state.mainMessage;
            mainMessage = "Message Deleted"
            this.setState({
                currentMainView: '',
                mainMessage
            })
        }
    }
    //On clicking on an article take that index, indentifying the number in the initial array of articles and pass that info to the MainView component.
    navigationSectionClickToMain(index) {
        const self = this;
        return function() {
            const currentMainView = [self.state.allMessages.messages[index], index];
            const allMessages = self.state.allMessages;
            allMessages.messages[index].unread = false;
            self.setState({
                currentMainView,
                allMessages
            })
        }
    }

    //In reference to the drop down filter in the MainView.
    dropdownHandleChange(e) {
        this.setState({
            dropdownValue: e.target.value
        }, () => {
            this.sortArticles();
        } );
    }
    //Depending on the current value, sort articles by either Sender, Subject OR Date.
    sortArticles() {
        const value = this.state.dropdownValue;
        const messages = this.state.allMessages;
        if(value === 'date') {
            allMessages.messages.sort((a, b) => {
                return b.time_sent - a.time_sent;
            })
            this.setState({
                allMessages
            })
        }
        if(value === 'sender') {
            allMessages.messages.sort((a, b) => {
                return ('' + a.sender).localeCompare(b.sender);
            })
            this.setState({
                allMessages
            })
        }
        if(value === 'subject') {
            allMessages.messages.sort((a, b) => {
                return ('' + a.subject).localeCompare(b.subject);
            })
            this.setState({
                allMessages
            })
        }
    }
    render() {
        return(
            <div id="App">
                <NavigationSection
                    messages={this.state.allMessages}  navigationSectionClickToMain={this.navigationSectionClickToMain}
                    dropdownHandleChange={this.dropdownHandleChange} dropdownValue={this.state.dropdownValue} masterArticleStyle={this.state.masterArticleStyle} deleteMessage={this.deleteMessage}
                />

                <MainView
                    currentMainView={this.state.currentMainView} mainMessage={this.state.mainMessage}
                />
            </div>
        )
    }
}
