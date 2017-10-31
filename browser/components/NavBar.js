import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/user'
import LogIn from './LogIn';
import Scroll from 'react-scroll';


function NavBar(props) {
    const { user } = props;
    const ScrollLink = Scroll.Link;

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to='/' className="navbar-brand">Tipple</Link>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"> <ScrollLink to='cocktail' smooth={true} offset={600} duration={500} className="navbar-brand">Search</ScrollLink></li>
                        {!user.id ?
                            <li className="nav-item">
                                <LogIn />
                            </li>
                            :
                            <li className="nav-item">
                                <Link to='/' className="nav-link" onClick={() => props.logout(props.history)}><strong>{user.email}</strong> Logout </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {
            dispatch(logout(history));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)