// src/components/admin/BranchList.jsx
import React from 'react';

const BranchList = ({ branches, onEdit, onDelete }) => {
  return (
    <ul>
      {branches.map(branch => (
        <li key={branch._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>{branch.name}</h3>
          <p>Ünvan: {branch.address}</p>
          <p>Telefon: {branch.phone}</p>
          <p>İş saatları: {branch.hours}</p>
          <p><a href={branch.link} target="_blank" rel="noopener noreferrer">Xəritədə göstər</a></p>
          <button onClick={() => onEdit(branch)}>Redaktə et</button>
          <button onClick={() => onDelete(branch._id)}>Sil</button>
        </li>
      ))}
    </ul>
  );
};

export default BranchList;
