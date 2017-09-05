import React, { Component } from 'react';

class NotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="g-section">
                <h1>По вашему запросу ничего не нашлось</h1>
                <a href="/">Вернуться на главную страницу</a>
            </div>
        );
    }

}

export default NotFound;