import React, { useEffect } from 'react';
import { useFormik } from 'formik';

const NewsForm = ({ onSave, editingNews, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: '', // Şəkil linki
    },
    onSubmit: (values) => {
      const formData = {
        title: values.title,
        content: values.content,
        image: values.image,
      };
      onSave(formData);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (editingNews) {
      formik.setValues({
        title: editingNews.title || '',
        content: editingNews.content || '',
        image: editingNews.image || '',
      });
    }
  }, [editingNews]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50">
      <input
        type="text"
        name="title"
        placeholder="Başlıq"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="content"
        placeholder="Məzmun"
        onChange={formik.handleChange}
        value={formik.values.content}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Şəkil linki (https://...)"
        onChange={formik.handleChange}
        value={formik.values.image}
        className="w-full p-2 border rounded"
      />
      <div className="space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          {editingNews ? 'Yadda saxla' : 'Əlavə et'}
        </button>
        {editingNews && (
          <button type="button" onClick={onCancel} className="text-gray-500 underline">
            Ləğv et
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;
