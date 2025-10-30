import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addOrchid, editOrchid } from '../../store/slices/orchidSlice';
import './OrchidForm.scss';

// Validation Schema
const orchidValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  category: Yup.string()
    .required('Category is required'),
  origin: Yup.string()
    .required('Origin is required')
    .min(2, 'Origin must be at least 2 characters'),
  color: Yup.string()
    .required('Color is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  isSpecial: Yup.boolean(),
  isNatural: Yup.boolean(),
  numberOfLike: Yup.number()
    .min(0, 'Likes cannot be negative')
    .default(0),
});

export default function OrchidForm({ orchid, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orchids);

  const initialValues = orchid || {
    name: '',
    category: '',
    origin: '',
    color: '',
    rating: 5,
    image: '',
    isSpecial: false,
    isNatural: false,
    numberOfLike: 0,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (orchid && orchid.id) {
        // Update existing orchid
        await dispatch(editOrchid({ id: orchid.id, orchidData: values })).unwrap();
        alert('✅ Orchid updated successfully!');
      } else {
        // Create new orchid
        await dispatch(addOrchid(values)).unwrap();
        alert('✅ Orchid created successfully!');
      }
      
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      alert('❌ Error: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="orchid-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>{orchid ? '✏️ Edit Orchid' : '➕ Add New Orchid'}</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={orchidValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="orchid-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name">Orchid Name *</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter orchid name"
                  className={errors.name && touched.name ? 'error' : ''}
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className={errors.category && touched.category ? 'error' : ''}
                >
                  <option value="">Select category</option>
                  <option value="Phalaenopsis">Phalaenopsis</option>
                  <option value="Cattleya">Cattleya</option>
                  <option value="Dendrobium">Dendrobium</option>
                  <option value="Vanda">Vanda</option>
                  <option value="Oncidium">Oncidium</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="category" component="div" className="error-message" />
              </div>

              {/* Origin & Color in Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="origin">Origin *</label>
                  <Field
                    type="text"
                    id="origin"
                    name="origin"
                    placeholder="e.g., Vietnam"
                    className={errors.origin && touched.origin ? 'error' : ''}
                  />
                  <ErrorMessage name="origin" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color *</label>
                  <Field
                    type="text"
                    id="color"
                    name="color"
                    placeholder="e.g., Pink"
                    className={errors.color && touched.color ? 'error' : ''}
                  />
                  <ErrorMessage name="color" component="div" className="error-message" />
                </div>
              </div>

              {/* Rating & Likes in Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rating">Rating (1-5) *</label>
                  <Field
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    className={errors.rating && touched.rating ? 'error' : ''}
                  />
                  <ErrorMessage name="rating" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="numberOfLike">Number of Likes</label>
                  <Field
                    type="number"
                    id="numberOfLike"
                    name="numberOfLike"
                    min="0"
                  />
                  <ErrorMessage name="numberOfLike" component="div" className="error-message" />
                </div>
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className={errors.image && touched.image ? 'error' : ''}
                />
                <ErrorMessage name="image" component="div" className="error-message" />
              </div>

              {/* Checkboxes */}
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <label>
                    <Field type="checkbox" name="isSpecial" />
                    <span>⭐ Special Orchid</span>
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <Field type="checkbox" name="isNatural" />
                    <span>🌿 Natural (not Hybrid)</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions">
                {onClose && (
                  <button type="button" onClick={onClose} className="btn-cancel">
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn-submit"
                >
                  {isSubmitting || loading ? 'Saving...' : orchid ? 'Update Orchid' : 'Create Orchid'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
