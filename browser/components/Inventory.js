import React from 'react';
import { connect } from 'react-redux'
import { filterBarCart } from '../store/barcart'
import Infinite from 'react-infinite';

const Inventory = (props) => {
    const { filterBarCart, user } = props;
    let { barcart } = props;

    if (barcart[0] && barcart[0].liquor) {
        barcart = barcart.length && barcart.map(item => {
            return item.liquor;
        })
    }

    return (
        <div className='row inventory'>
            {barcart.length ? <p><small>*click to delete</small></p> : null }
            <Infinite containerHeight={350} elementHeight={30} className='list-group'>
                {barcart && barcart.map(ing => {
                    return (
                        <li key={ing} className='list-group-item list-group-item' onClick={() => filterBarCart(barcart, ing, user.id)}>
                            {ing}
                            <br />
                        </li>
                    );
                })}
            </Infinite>
        </div>

    );
}


const mapStateToProps = ({ barcart, user }) => {
    return { barcart, user }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterBarCart: (barCart, removedId, userId) => {

            dispatch(filterBarCart(barCart, removedId, userId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
