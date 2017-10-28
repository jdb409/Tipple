import React from 'react';
import { connect } from 'react-redux'
import { filterBarCart } from '../store/barcart'

const Inventory = (props) => {
    const { filterBarCart, barcart } = props;
    console.log('asdfs', props)
    return (
        <div className='row inventory'>
            <ul className='list-group'>
                {barcart.map(ing => {
                    return (
                        <li className='list-group-item' key={ing} className='btn btn-success btn-md' onClick={() => filterBarCart(barcart, ing)}>
                            {ing}
                            <br />
                        </li>
                    );
                })}
            </ul>
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
