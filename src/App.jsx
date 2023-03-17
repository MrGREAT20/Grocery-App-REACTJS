import React, { useCallback, useEffect, useState } from 'react';
import Alert from './Alert';
import List from './List';


function getlocalstorage(){
    let list = localStorage.getItem('list');
    if(list){
        return JSON.parse(list);
    }
    return [];
}
function App(){
    const [name, setName] = useState('');
    const [list, setList] = useState(getlocalstorage());
    const [isEditing, setisEditing]  = useState(false);
    const [editId, setEditId] = useState(null);
    const [alert, setAlert] = useState({show:false, msg:'', type:''});
    function handleSubmit(event){
        event.preventDefault();
        if(!name){
            //display alert, no empty values should be in the DB
            showAlert(true, 'danger', 'Please enter value');   
        }
        else if(name && isEditing){
            //deal with the edit
            let var1 = "", var2 = "";
            setList(list.map((item) => {
                if(item.id === editId){
                    var1 = item.title;
                    var2 = name;
                    return{...item, title:name}
                }
                return item;
            }))
            setName('');
            setEditId(null);
            setisEditing(false);
            showAlert(true, 'success', `${var1} updated to ${var2}`);
        }
        else{
            //add item to the list
            showAlert(true, 'success', `${name} added to the list`);
            const newList = {
                id: new Date().getTime().toString(),
                title: name,
            };
            setList(list => [...list, newList]);
            setName('');
        }
    }
    function showAlert(show=false, type='', msg=''){
        setAlert({show, type, msg});
    }
    function clearList(){
        showAlert(true, 'danger', 'empty list');
        setList([]);
    }
    function removeItem(id, title){
        showAlert(true, 'danger', ` ${title} removed`);
        setList(list.filter((item) => item.id!== id));
    }
    function editItem(id){
        const specificitem = list.find((item) => item.id === id);
        setisEditing(true);
        setEditId(id);
        setName(specificitem.title);
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])
    return(<>
    <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} items={list}/>}
        <h3>grocery bud</h3>
        <div className='form-control'><input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setName(e.target.value)}/>
        <button type='submit' className='submit-btn'>{isEditing ? 'edit' : 'submit'}</button></div>
    </form>
    {list.length > 0 && <div className='grocery-container'>
            <List items = {list} removeItem={removeItem} editItem={editItem}/>
            <button className='clear-btn' onClick={clearList}>Clear Items</button>
        </div>}
    </section>
    </>);
}
export default App;