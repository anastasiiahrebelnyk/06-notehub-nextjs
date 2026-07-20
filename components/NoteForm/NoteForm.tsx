'use client';

import { useId } from 'react';
import css from './NoteForm.module.css';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import type { NoteFormValues } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import Link from 'next/link';

interface NoteFormProps {
  onSuccess: () => void;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title is too long')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content is too long'),
    tag: Yup.string<'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'>(),
  });

  const createNoteM = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    console.log(values);
    createNoteM.mutate(values);
    actions.resetForm();
    onSuccess();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onSuccess}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteM.isPending}
          >
            Create Note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
