import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as selectors from '../../store/selectors';

import styles from './articleForm.module.scss';

function ArticleForm({ isEditing, onSubmit, submitRef }) {
  const article = useSelector(selectors.currentArticle);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const [title, setTitle] = useState(article?.title);
  const [description, setDescription] = useState(article?.description);
  const [body, setBody] = useState(article?.body);

  useEffect(() => {
    if (!isEditing) {
      append();
    } else {
      const texts = [];
      article.tagList.forEach((item) => {
        texts.push({ text: item });
      });
      append(texts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const addTag = () => {
    append({ text: '' });
  };

  const deleteTag = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const titleValue = {
    value: isEditing ? title : null,
    onChange: (e) => setTitle(e.target.value),
  };

  const descriptionValue = {
    value: isEditing ? description : null,
    onChange: (e) => setDescription(e.target.value),
  };

  const bodyValue = {
    value: isEditing ? body : null,
    onChange: (e) => setBody(e.target.value),
  };

  return (
    <div className={styles.formBlock}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.title}>{isEditing ? 'Edit article' : 'Create new article'}</h2>
        <label>
          Title
          <input
            placeholder="Title"
            {...register('title', {
              required: { value: true, message: 'Title is required' },
              maxLength: { value: 100, message: 'Maximum title length 100 characters' },
            })}
            {...titleValue}
          />
          {errors?.title && <p className={styles.errorMessage}>{errors.title.message}</p>}
        </label>
        <label>
          Short description
          <input
            placeholder="Description"
            {...register('description', {
              required: { value: true, message: 'Title is required' },
              maxLength: { value: 100, message: 'Maximum description length 100 characters' },
            })}
            {...descriptionValue}
          />
          {errors?.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
        </label>
        <label>
          Text
          <textarea
            placeholder="Text"
            {...register('body', { required: true })}
            {...bodyValue}
          />
          {errors?.body && <p className={styles.errorMessage}>Text is required</p>}
        </label>
        <label>Tags</label>
        <div className={styles.tags}>
          <div className={styles.tagsList}>
            {fields.map((field, index) => (
              <div
                className={styles.tag}
                key={field.id}
              >
                <input
                  placeholder="Tag"
                  // {...register(`tags[${index}].text`, { required: { value: true, message: 'Tag is required' } })}
                  {...register(`tags[${index}].text`, {
                    maxLength: { value: 50, message: 'Maximum tag length 50 characters' },
                  })}
                />
                <button
                  onClick={() => deleteTag(index)}
                  type="button"
                >
                  Delete
                </button>
                {errors?.tags?.[index] && <p className={styles.errorMessage}>{errors.tags[index].text.message}</p>}
              </div>
            ))}
          </div>
          <button
            className={styles.addTagBtn}
            onClick={addTag}
            type="button"
          >
            Add tag
          </button>
        </div>
        <button
          className={styles.submit}
          disabled={!isValid}
          ref={submitRef}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
