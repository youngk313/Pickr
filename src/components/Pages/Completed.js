import React from "react";
import Firebase from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import WifiIcon from '@material-ui/icons/Wifi';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Avatar from '@material-ui/core/Avatar';

import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader';

//Creative Icon
import BrushIcon from '@material-ui/icons/Brush';

//Nature Icon
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

//Fitness Icon
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

//Food Icon
import FastFoodIcon from '@material-ui/icons/Fastfood';

//Romantic Icon
import FavoriteIcon from '@material-ui/icons/Favorite';

//Culture Icon
import LibraryIcon from '@material-ui/icons/LocalLibrary';

//Volunteer Icon
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';

//Games Icon
import GamesIcon from '@material-ui/icons/Games';

const icons = {
    Fitness: {
        icon: <FitnessCenterIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#0277bdCC"
    },
    Creative: {
        icon: <BrushIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#fbc02dAA"
    },
    Nature: {
        icon: <FilterHdrIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#66bb6aCC"
    },
    Culture: {
        icon: <LibraryIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#8e24aaCC"
    },
    Food: {
        icon: <FastFoodIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#8d6e63CC"
    },
    Romantic: {
        icon: <FavoriteIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#ec407aCC"
    },
    Volunteer: {
        icon: <SupervisorIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#ec407aCC"
    },
    Games: {
        icon: <GamesIcon style={{ color: 'white', fontSize: '14px' }} />,
        color: "#ec407aCC"
    },
};

class Completed extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            allQuests: null,
            completed: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.firebase.auth.onAuthStateChanged(user => {
            if (user) {

                this.firebase.completed(user.uid).once('value', snapshot => {
                    this.setState({
                        completed: snapshot.val(),
                    });
                }).then(() => {
                    this.firebase.questsAll().once('value', snapshot => {
                        this.setState({
                            allQuests: snapshot.val(),
                            loading: false,
                        });
                    });
                });
            }
        });
    }

    formatDate = (date) => {
        let d = new Date(date);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[d.getMonth()];
        let day = d.getDate();
        let suffix;
        switch (parseInt(day)) {
            case 21: {
                suffix = "st";
                break;
            }
            case 2: {
                suffix = "nd";
                break;
            }
            default: {
                suffix = "th";
            }
        }
        return (<span>{month} {day}{suffix}</span>);
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        if (this.state.completed == null) {
            return(<div>hello</div>)
        }

        const completed = Object.entries(this.state.completed);
        const data = this.state.allQuests;
        console.log(data)
        //{completed.map(quest => console.log(quest))}

        /*                    <ListItem>
                        <ListItemText
                            primary="Watch a Movie"
                            secondary={
                                <React.Fragment>
                                    <Chip style={{ height: '20px', marginTop: '5px', color: 'white', borderColor: 'white', background: "#66bb6aAA" }}
                                        label="35"
                                        icon={<FilterHdrIcon style={{ color: 'white', fontSize: '14px' }} />} />
                                    <Chip style={{ height: '20px', marginLeft: '1em', marginTop: '5px', color: 'white', borderColor: 'white', background: "#fbc02d99" }}
                                        label="75"
                                        icon={<BrushIcon style={{ color: 'white', fontSize: '14px' }} />} /> </React.Fragment>} />
                        <ListSubheader>
                            <span style={{fontWeight: '400'}}>May 20th</span>
                        </ListSubheader>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <AutorenewIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider light />*/

        return (
            <div>
                <List style={{ margin: '0 1em' }}>
                    {completed.slice(0).reverse().map(x => (
                        <ListItem key={x[0]} divider>
                            <ListItemText primary={data[x[1]['questID']]['name']}
                                secondary={
                                    Object.entries(data[x[1]['questID']]['categories']).map(y => (
                                        <Chip key={y[0]} 
                                            style={{ height: '20px', marginRight: '1em', marginTop: '5px', color: 'white', borderColor: 'white', background: `${icons[y[0]]['color']}` }}
                                            label={y[1]}
                                            icon={icons[y[0]]['icon']}
                                        />
                                    ))
                                } />
                            <ListSubheader>
                                <span style={{ fontWeight: '400' }}>{this.formatDate(x[1]['completedDate'])}</span>
                            </ListSubheader>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <AutorenewIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>)
    }
}

export default Completed;