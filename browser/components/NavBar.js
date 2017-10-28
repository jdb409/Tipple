import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../store/user'

function NavBar(props) {
    const { user } = props;
    console.log('sadfsadf', user.id);
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">Tipple</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link to='/' className="nav-link" >Search </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    {!user.id ?
                        <li className="nav-item">
                            <Link to='/login' className="nav-link" >Login </Link>
                        </li>

                        :

                        <li className="nav-item">
                            <Link to='/' className="nav-link" onClick={() => props.logout()}>Logout </Link>
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
        logout: () => {
            dispatch(logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)