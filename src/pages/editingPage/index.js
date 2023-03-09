import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { message } from 'antd';

import ArticleForm from '../../components/articleForm';
import baseURL from '../../vars';
import * as selectors from '../../store/selectors';

function EditingPage() {
  const slug = useSelector(selectors.slug);
  const token = localStorage.getItem('token');
  const submitRef = useRef();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    submitRef.current.disabled = true;
    const tagList = data.tags.map((tag) => tag.text);
    const requestBody = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList,
      },
    };
    const request = await fetch(`${baseURL}/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const response = await request.json();
    if (!response.errors) {
      navigate(`/article/${response.article.slug}`);
    } else {
      submitRef.current.disabled = false;
      message.error('Something went wrong. Try again');
    }
  };

  return (
    <ArticleForm
      isEditing
      onSubmit={onSubmit}
      submitRef={submitRef}
    />
  );
}

export default EditingPage;
