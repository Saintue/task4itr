import { Posts } from '../posts/posts';
import { useReducer } from 'react';
import reducer from '../../Reducer';
import './table-component.css';
export let initUsers = await Posts.getUsers();

export function TableComponent() {
  const [state, dispatch] = useReducer(reducer, initUsers);
  function toggleAll() {
    let checkboxes = document.getElementsByName('userCheckbox');
    checkboxes.forEach(el => (el.checked = !el.checked));
  }
  try {
    let stringToCheck = localStorage.getItem('currentUser')
    let curUserToCheck = state.find(el => el.email === stringToCheck.replace(/^"(.*)"$/, '$1'))
    if (curUserToCheck.status === "false") {
      localStorage.setItem('currentUser', JSON.stringify('none'))
      window.location.reload();
    }
  } catch (e){
    console.log(e)}
  async function updateUsers(type) {
    const usersToUpdate = document.getElementsByName('userCheckbox');
    let res = [];
    console.log(res);
    for (let i = 0; i < usersToUpdate.length; i++) {
      if (usersToUpdate[i].checked === true)
        res.push(state.find(el => el._id === usersToUpdate[i].value));
    }
    console.log(res);


    switch (type) {
      case 'deletion':
        let deleteStatus = await Posts.deleteUsers(res);
        console.log(deleteStatus)
        dispatch({
          type: 'update',
          payload: res,
        });
        for (let i = 0; i < usersToUpdate.length; i++) {
          usersToUpdate[i].checked = false;
        }
        break;
      case 'block':
        let blockStatus = await Posts.updateUsers(res, 'block');
        console.log(blockStatus)
        dispatch({
          type: 'block',
          payload: res,
        });
        for (let i = 0; i < usersToUpdate.length; i++) {
          usersToUpdate[i].checked = false;
        }
        break;
      case 'unBlock':
       let unBlockStatus = await Posts.updateUsers(res, 'unBlock');
       console.log(unBlockStatus)
        dispatch({
          type: 'unBlock',
          payload: res,
        });
        for (let i = 0; i < usersToUpdate.length; i++) {
          usersToUpdate[i].checked = false;
        }
        break;

      default:
        return;
    }
  }

  return (
    <div className={'d-flex justify-content-center container'}>
      <table>
        <thead>
          <tr>
            <th colSpan={6}>
              <div
                className={'d-flex align-items-center'}
                style={{ minHeight: '60px', maxHeight: '80px' }}>
                <div className={'container'}>
                  <div
                    className={
                      'header-component d-flex flex-row align-items-center'
                    }>
                    <div className={'col d-flex justify-content-start gap-3'}>
                      <div
                        className={
                          'col align-items-center justify-content-between d-flex badge me-1 gap-1'
                        }
                        style={{ height: '40px', maxWidth: '350px' }}>
                        <div>Tools:</div>
                        <button
                          className={'btn btn-danger w-100'}
                          style={{ maxHeight: '60px', maxWidth: '80px' }}
                          onClick={() => updateUsers('block')}>
                          block
                        </button>
                        <button
                          className={'btn btn-success w-100'}
                          style={{ maxHeight: '60px', maxWidth: '80px' }}
                          onClick={() => updateUsers('unBlock')}>
                          unblock
                        </button>
                        <button
                          className={'btn btn-danger w-100'}
                          onClick={() => updateUsers('deletion')}
                          style={{ maxHeight: '60px', maxWidth: '80px' }}>
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th>
              <input type={'checkbox'} onClick={() => toggleAll(this)} />
            </th>
            <th>name</th>
            <th>email</th>
            <th>status</th>
            <th>registerTime</th>
            <th>lastLoginTime</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(state)
            ? state.map(user => (
                <tr>
                  <td>
                    <input
                      name={'userCheckbox'}
                      type={'checkbox'}
                      value={user._id}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{user.regTime}</td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))
            : console.log(state)}
        </tbody>
      </table>
    </div>
  );
}
