import React from 'react';
import {countByKey} from '../utils';

const Facet = (props) => (
    <div>
      <div>Facet</div>

        {countByKey(props.items,'brand').map((item) =>
           <li onClick={()=>props.onFacetSelect(item)}>{item.brand} ({item.count})</li>
        )}
    </div>
);


Facet.propTypes = {
  items: React.PropTypes.array.isRequired,
  onFacetSelect: React.PropTypes.func
};

export default Facet;