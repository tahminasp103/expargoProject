// DeleteUser.jsx
import React, { useState } from 'react';
import style from './DeleteUser.module.scss';

const DeleteUser = ({ onClose, onDelete, user }) => {
  const [fullNameInput, setFullNameInput] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);

  const expectedFullName = `${user.name} ${user.surname}`;
  const isValid = fullNameInput.trim() === expectedFullName && confirmChecked;

  return (
    <div className={style.overlay}>
      <div className={style.deleteUser}>
        <div className={style.container}>
          <div className={style.text}>
            <h2>Hesabı sil</h2>
            <span onClick={onClose} className={style.close}>Bağla </span>
          </div>

          <div className={style.inp}>
            <p>
              Ad və soyadınızı aşağıdakı nümunə kimi qeyd edərək EXPARGO hesabınızın birdəfəlik silinməsini təstiqləyin.
            </p>
          </div>

          <div className={style.inp}>
            <span>Ad və soyad</span>
            <input
              type="text"
              value={fullNameInput}
              onChange={(e) => setFullNameInput(e.target.value)}
            />
            <strong className={style.example}>Nümunə: <b>{expectedFullName}</b></strong>
          </div>

          <div className={style.inp}>
            <label className={style.checkbox}>
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
              />
              Bu hesaba aid bütün məlumatların silinməsini təstiqləyirəm
            </label>
          </div>

          <button
            className={style.deleteButton}
            onClick={onDelete}
            disabled={!isValid}
          >
            Hesabı sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
