import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import ArticleForm from '../../components/articleForm';
import baseURL from '../../vars';
import * as selectors from '../../store/selectors';

function NewArticlePage() {
  const navigate = useNavigate();
  const isLogged = useSelector(selectors.isLoggedIn);
  const token = useSelector(selectors.token);
  const submitRef = useRef();

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
    const request = await fetch(`${baseURL}/articles`, {
      method: 'POST',
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

  useEffect(() => {
    if (!isLogged) {
      navigate('/log-in');
    }
  }, [isLogged, navigate]);

  return (
    <ArticleForm
      isEditing={false}
      onSubmit={onSubmit}
      submitRef={submitRef}
    />
  );
}

export default NewArticlePage;
