import React from 'react';
import './MainView.css';
import moment from 'moment';


const MainView = (props) => {
    const currentMainView = props.currentMainView;
    return (
        <div id="MainView">
            {!currentMainView &&
                <p id="no-selection">{props.mainMessage}</p>
            }
            {currentMainView &&
                <div className="main-container">
                    <span>{currentMainView[0].sender}</span>
                    <span>{new
                    moment(currentMainView[0].time_sent).format('ddd D MMM, HH:mm')}</span>
                    <h1>{currentMainView[0].subject}</h1>
                    <div className="body-container">
                        <p>{currentMainView[0].message}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default MainView;
