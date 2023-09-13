import React, {Component} from 'react';


export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.result = this.props.result;
        this.searchValue = this.props.searchValue;
        this.setGymName = this.props.setGymName;
        this.formatName = this.formatName.bind(this);
    }

    formatName() {
        const name = this.result.name;

        const regex = new RegExp(this.searchValue, 'i');

        const formattedName = name.replace(regex, (match) => `<strong>${match}</strong>`);

        return {__html: formattedName};
    };

    render() {
        return (
            <div
                className="search-result"
                onClick={() => this.setGymName(this.result.name)}
                dangerouslySetInnerHTML={this.formatName()}
            >
            </div>
        );
    }
};