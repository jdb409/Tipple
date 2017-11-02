import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/user'
import LogIn from './LogIn';
import Scroll from 'react-scroll';
import SignUp from './SignUp';

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
                    <ul className="nav navbar-nav">
                        {!user.id ?
                            <div className="dropdown">
                                <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">SignUp<span className="caret" /></button>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                        <SignUp />
                                    </li>
                                </ul>
                            </div>
                            :
                            <ScrollLink to='cocktail' smooth={true} offset={700} duration={500} ><Link to='/profile' className="navbar-brand">Profile</Link></ScrollLink>
                        }
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item"> <ScrollLink to='cocktail' smooth={true} offset={700} duration={500}>Search</ScrollLink></li>
                        {!user.id ?
                            <li className='nav-item'>
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Login <span className="caret" /></button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <LogIn />
                                        </li>
                                    </ul>
                                </div>
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