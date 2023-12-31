import React, {Component} from "react";
import {Grid, Button, Typography} from "@material-ui/core";
import {getCookie} from "../csrftoken";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer"

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.votesToSkip = this.props.votes_to_skip;
        this.guestCanPause = this.props.guest_can_pause;
        this.isHost = this.props.is_host;
        this.state = {
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
        };
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    authenticateSpotify() {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                this.setState({spotifyAuthenticated: data.status});
                console.log("authenticateSpotify() <><>< spotifyAuthenticated:" + data.status);
                if (!data.status) {
                    this.redirectToAuthUrl();
                }
            });
    }

    getCurrentSong() {
        fetch("/spotify/current-song")
            .then((response) => {
                if (response.status === 302) {
                    console.log("redirecting to url: " + response.url);
                    this.redirectToAuthUrl(response.url);
                } else if (response.ok) {
                    console.log("response redirected: " + response.redirected);
                    return response.json();
                } else {
                    return {};
                }
            })
            .then((data) => {
                this.setState({song: data});
                console.log("<> Room.js <> getCurrentSong() <> song:" + JSON.stringify(this.state.song))
            });
    }

    redirectToAuthUrl(url = '/spotify/get-auth-url') {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                window.location.replace(data.url);
            })
    }

    leaveButtonPressed() {
        const csrfToken = getCookie('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken
            },
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push('/');
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage update={true}
                                    votesToSkip={this.state.votesToSkip}
                                    guestCanPause={this.state.guestCanPause}
                                    roomCode={this.roomCode}
                                    updateCallback={this.getRoomDetails}
                    >
                    </CreateRoomPage>

                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained'
                            color='secondary'
                            onClick={() => this.updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.leaveButtonPressed}
                    >
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}