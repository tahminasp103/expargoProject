import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBranches, createBranch, updateBranch, deleteBranch
} from '../../../../redux/reducers/BranchSlice';
import BranchForm from '../../branchForm/BranchForm';
import BranchList from '../../branchList/BranchList';

const AdminBranch = () => {
  const dispatch = useDispatch();
  const { branch, loading, error } = useSelector(state => state.branch);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleSave = (data) => {
    if (editing) {
      dispatch(updateBranch({ id: editing._id, branchData: data }));
      setEditing(null);
    } else {
      dispatch(createBranch(data));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Silinsin?')) {
      dispatch(deleteBranch(id));
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">🏢 Filiallar</h2>
      <BranchForm onSave={handleSave} editingBranch={editing} onCancel={() => setEditing(null)} />
      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <BranchList branches={branch} onEdit={setEditing} onDelete={handleDelete} />
    </section>
  );
};

export default AdminBranch;
