import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../../components/articleForm';
import baseURL from '../../vars';

function EditingPage() {
  const slug = useSelector((state) => state.articlesReducer.currentArticle.article.slug);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const onSubmit = async (data) => {
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
    }
  };

  return (
    <ArticleForm
      isEditing
      onSubmit={onSubmit}
    />
  );
}

export default EditingPage;
