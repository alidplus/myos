import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProduct } from 'models/types'
import { FC, useState, ChangeEvent } from 'react'
import { Button, Modal, Form, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProduct, createProduct } from 'store/modules/Product/operations';
import { Formik, Field, Form as FormikForm, FormikHelpers, FieldProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import { type } from 'os';

const FILE_SIZE = 2e6
type ProductUpdateData = Partial<IProduct> & { upload?: { file: File, fullPath: string } }

const productSchema = Yup.object().shape({
  upload: Yup.mixed()
    .test('fileFormat', 'Image only', (upload) => {
      return upload ? upload.file.type && upload.file.type.startsWith('image/') : true
    })
    .test('fileSize', "File Size is too large", upload => {
      return upload ? upload.file.size && upload.file.size < FILE_SIZE : true
    }),
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    price: Yup.number()
      .min(0, 'Just Positive numbers!')
      .required('Required'),
  description: Yup.string()
});

interface IEditProductProps {
  product: IProduct
  btnVariant?: string
  btnClassName?: string
}

function handleFileOnChange(formik: FormikProps<ProductUpdateData>, fieldName: string, event: ChangeEvent<HTMLInputElement>) {
  if (event.target && event.target.files && event.target.files.length) {
    const file: File = event.target.files[0]
    formik.setFieldValue(fieldName, { file, fullPath: event.target.value });
  }
}

const EditProduct: FC<IEditProductProps> = ({ product = {}, children, btnVariant, btnClassName }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleSubmit = async (update: ProductUpdateData) => {
    if (update?.upload?.file) {
      try {
        update.image = await (new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          if (update?.upload?.file)
          reader.readAsDataURL(update.upload.file);
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            }
          }
          reader.onerror = error => reject(error);
        }))
      } catch(e) {
        console.log('convert err', e);
      } finally {
        delete update.upload
      }
    }
    if (product._id)
      dispatch(updateProduct(product, update));
    else
      dispatch(createProduct(update));
  }
  return (
    <>
      <Button variant={btnVariant || "outline-primary"} className={btnClassName} onClick={handleShow}>
        {children || 'missing children'}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Formik
          initialValues={product}
          validationSchema={productSchema}
          onSubmit={async ( values: ProductUpdateData, { setSubmitting }: FormikHelpers<ProductUpdateData> ) => {
            console.log('handleSubmit', values);
            await handleSubmit(values)
            setSubmitting(false);
            handleClose();
          }}
        >
          <FormikForm>
            <Modal.Header closeButton>
              <Modal.Title>
                Product Form
              </Modal.Title>
              {product._id && (<small><Badge className='ms-2'>{product._id}</Badge></small>)}
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex">
                {product.image ? (
                  <img src={product.image} className="img-thumbnail thmb-150-sq mx-auto" />
                ) : null}
              </div>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Image</Form.Label>
                <Field name="upload">
                  {({ field, form, meta }: FieldProps) => (
                    <>
                      <Form.Control
                        {...field}
                        isInvalid={meta.touched && !!meta.error}
                        type="file"
                        placeholder="Product image"
                        value={field.value?.fullPath ?? ''}
                        accept="image/*"
                        onChange={handleFileOnChange.bind(null, form, field.name)}
                      />
                      {meta.touched && !!meta.error && (
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      )}
                    </>
                  )}
                </Field>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Field name="title">
                  {({ field, form, meta }: FieldProps) => (
                    <>
                      <Form.Control isInvalid={meta.touched && !!meta.error} placeholder="Product title" {...field}/>
                      {meta.touched && !!meta.error && (
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      )}
                    </>
                  )}
                </Field>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Field name="price">
                  {({ field, form, meta }: FieldProps) => (
                    <>
                      <Form.Control type="number" isInvalid={meta.touched && !!meta.error} placeholder="Price" {...field}/>
                      {meta.touched && !!meta.error && (
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      )}
                    </>
                  )}
                </Field>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Field name="description">
                  {({ field, form, meta }: FieldProps) => (
                    <>
                      <Form.Control isInvalid={meta.touched && !!meta.error} {...field} as="textarea"/>
                      {meta.touched && !!meta.error && (
                        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                      )}
                    </>
                  )}
                </Field>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-primary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </FormikForm>
        </Formik>
      </Modal>
    </>
  )
}

export default EditProduct