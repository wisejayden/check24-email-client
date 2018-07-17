import React from 'react';
import './NavigationSection.css';
import FilterDropdown from './FilterDropdown';
import moment from 'moment';
import close from '../../public/images/close.png';




const NavigationSection = (props) => {
    const messages = props.messages.messages;
        return (
        <div id="NavigationSection">
            <FilterDropdown
                dropdownHandleChange={props.dropdownHandleChange} dropdownValue={props.dropdownValue}
            />
            {messages &&
                messages.map((message, i) => {
                    if(message.unread) {
                        return(
                            <div  onClick={props.navigationSectionClickToMain(i)} id={'article-' + i} className="message-container" key={i}>
                                <h1>{message.sender}</h1>
                                <p>{message.subject}</p>
                                <p>{new
                                moment(message.time_sent).format('ddd D MMM, HH:mm')}</p>
                                <img name={i}onClick={props.deleteMessage} className="delete-message-icon" src={close} />
                            </div>
                        )
                    } else {
                        return(
                            <div  onClick={props.navigationSectionClickToMain(i)} id={'article-' + i} className="message-container read" key={i}>
                                <h1>{message.sender}</h1>
                                <p>{message.subject}</p>
                                <p>{new
                                moment(message.time_sent).format('ddd D MMM, HH:mm')}</p>
                                <img name={i}onClick={props.deleteMessage} className="delete-message-icon" src={close} />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default NavigationSection;
