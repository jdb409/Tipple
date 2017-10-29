import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/user'
import Login from './Login';

function NavBar(props) {
    const { user } = props;

    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <a className="navbar-brand" href="/">Tipple</a>
                    <li className="nav-item">
                        <Link to='/' className="nav-link" >Search </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    {!user.id ?
                        <li className="nav-item">
                            <Login />
                        </li>
                        :
                        <li className="nav-item">
                            <Link to='/' className="nav-link" onClick={() => props.logout(props.history)}><strong>{user.email}</strong> Logout </Link>
                        </li>
                    }

                </ul>
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