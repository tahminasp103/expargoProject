import React, { useEffect, useState } from 'react';

const FaqForm = ({ onSave, editingFaq, onCancel }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (editingFaq) {
      setQuestion(editingFaq.question);
      setAnswer(editingFaq.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [editingFaq]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ question, answer });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input type="text" placeholder="Sual" className="w-full border p-2" value={question} onChange={e => setQuestion(e.target.value)} required />
      <textarea placeholder="Cavab" className="w-full border p-2" value={answer} onChange={e => setAnswer(e.target.value)} required />
      <div className="space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingFaq ? 'Yadda saxla' : 'Əlavə et'}
        </button>
        {editingFaq && (
          <button onClick={onCancel} type="button" className="bg-gray-400 px-4 py-2 rounded">
            Ləğv et
          </button>
        )}
      </div>
    </form>
  );
};

export default FaqForm;
