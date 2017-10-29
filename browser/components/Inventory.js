import React from 'react';
import { connect } from 'react-redux'
import { filterBarCart } from '../store/barcart'
import Infinite from 'react-infinite';

const Inventory = (props) => {
    const { filterBarCart, barcart } = props;

    return (
        <div className='row inventory'>
            <Infinite containerHeight={350} elementHeight={30} className='list-group'>
                {barcart.map(ing => {
                    return (
                        <li key={ing} className='list-group-item list-group-item-danger' onClick={() => filterBarCart(barcart, ing)}>
                            {ing}
                            <br />
                        </li>
                    );
                })}
            </Infinite>
        </div>

    );
}


const mapStateToProps = ({ barcart }) => {
    return { barcart }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterBarCart: (barCart, removedId) => {
            dispatch(filterBarCart(barCart, removedId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
