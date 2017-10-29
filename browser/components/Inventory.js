import React from 'react';
import { connect } from 'react-redux'
import { filterBarCart } from '../store/barcart'
import Infinite from 'react-infinite';

const Inventory = (props) => {
    const { filterBarCart, user } = props;
    let {barcart} = props;
    console.log('bar', barcart)
    if ( barcart[0] && barcart[0].liquor) {
        barcart = barcart.length && barcart.map(item => {
            return item.liquor;
        })
    }
    console.log('bar', barcart)
    return (
        <div className='row inventory'>
            <Infinite containerHeight={350} elementHeight={30} className='list-group'>
                {barcart && barcart.map(ing => {
                    return (
                        <li  key = {ing} className='list-group-item list-group-item-danger' onClick={() => filterBarCart(barcart, ing, user.id)}>
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
            console.log('asdfds', removedId);
            dispatch(filterBarCart(barCart, removedId, userId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
