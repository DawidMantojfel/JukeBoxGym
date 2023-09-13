import React, {Component} from "react";
import Room from "./Room";

export default class GymRooms extends Component {
    constructor(props) {
        super(props);
        this.gymName = this.props.gymName;
        this.state = {
            gymRooms: [],
        };
    }

    componentDidMount() {
        this.fetchGymRooms(this.props.gymName);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gymName !== this.props.gymName) {
            this.fetchGymRooms(this.props.gymName)
        }
    }

    fetchGymRooms(gymName) {
        fetch(`/api/get-gym-rooms?gym-name=${gymName}`)
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Dodano return, aby zwrócić obiekt JSON
                } else {
                    console.error(`Response not ok! Status ${response.status}`);
                    throw new Error(`Response not ok! Status ${response.status}`);
                }
            })
            .then(data => {
                this.setState({gymRooms: data});
                console.log("GYM ROOMS FETCHED: " + data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
}

    render() {
        const { gymRooms } = this.state;

        return (
            <div>
                {gymRooms && gymRooms.map(room => (
                    <Room
                        key={room.id}
                        votes_to_skip={room.votes_to_skip}
                        guest_can_pause={room.guest_can_pause}
                        is_host={room.is_host}
                    />
                ))}
            </div>
        );
    }
}