import { ICart, IOrder } from 'models/types'
import { FC } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { submitOrder } from 'store/modules/Cart/operations';
import { Formik, Field, Form as FormikForm, FormikHelpers, FieldProps, FormikProps } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { pick } from 'lodash';
import C from 'lib/constants'

type OrderFormData = Omit<IOrder, 'cart' | '_id' | 'total' | 'taxRate'>

const cartFormSchema = Yup.object().shape({
  email: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
    .email('invalid email address'),
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!')
});

const initialOrderFrom: OrderFormData = {
  email: '',
  name: '',
  address: '',
}

interface ICartFormProps {
  cart: ICart[]
}

const CartForm: FC<ICartFormProps> = ({ cart = [] }) => {
  const dispatch = useDispatch();
  
  return (
    <Formik
      initialValues={initialOrderFrom}
      validationSchema={cartFormSchema}
      onSubmit={( values: OrderFormData, { setSubmitting }: FormikHelpers<OrderFormData> ) => {
        console.log('handleSubmit', values);
        const cartSummery: ICart[] = cart.map(({ count, product }) => ({
          count,
          product: pick(product, '_id', 'title', 'price')
        }))
        const total = cartSummery.reduce((sum, { product, count }) => sum + (product.price * count), 0) * (1 + C.TAX_RATE)
        const order: IOrder = { _id: '', total, taxRate: C.TAX_RATE, cart: cartSummery, ...values }
        dispatch(submitOrder(order));
        setSubmitting(false);
      }}
    >
      <FormikForm>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Field name="email">
            {({ field, form, meta }: FieldProps) => (
              <>
                <Form.Control inputMode="email" isInvalid={meta.touched && !!meta.error} placeholder="name@example.com" {...field}/>
                {meta.touched && !!meta.error && (
                  <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                )}
              </>
            )}
          </Field>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Field name="name">
            {({ field, form, meta }: FieldProps) => (
              <>
                <Form.Control isInvalid={meta.touched && !!meta.error} placeholder="Jon Dow" {...field}/>
                {meta.touched && !!meta.error && (
                  <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                )}
              </>
            )}
          </Field>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Field name="address">
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
        <div className="d-flex gap-1 justify-content-end">
          <Link href="/" passHref>
            <Button as='a' variant="outline-secondary" type="button">Continue shopping</Button>
          </Link>
          <Button variant="primary" type="submit">Submit order</Button>
        </div>
      </FormikForm>
    </Formik>
  )
}

export default CartForm