import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'

function List(prop){
    return (
        <div className='grocery-list'>{prop.items.map((item)=>{
            const {id, title} = item;
            return <article key={id} className='grocery-item'><p className='title'>{title}</p>
            <div className='btn-container'><button type='button' className='edit-btn' onClick={() => prop.editItem(id)}><FaEdit/></button><button type='button' className='delete-btn' onClick={() => prop.removeItem(id, title)}><FaTrash/></button></div>
            </article>
        })}</div>
    );
}
export default List;