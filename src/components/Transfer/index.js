import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SUPPORTED_TOKENS } from 'constants';

import './styles.css';

const transferSchema = Yup.object().shape({
    token: Yup.string().oneOf(Object.keys(SUPPORTED_TOKENS), "Unsupported token"),
    amount: Yup.number().required('Required').min(0, "Expected a positive number")
        .typeError('Must be a positive number'),
    to: Yup.string().required('Required').matches(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM address"),
});


export default function ({ tokenBalance, iczBalance, handleSubmit }) {

    const formik = useFormik({
        initialValues: {
            token: SUPPORTED_TOKENS.MYTOKEN[0],
            amount: 0,
            to: '',
        },
        
        onSubmit: values => {
            console.log('-----------Transfer form submitted!-----------');

            // if((values.token === SUPPORTED_TOKENS.MYTOKEN[0] && 
            //     new BigNumber(values.amount).multipliedBy(Math.pow(10,18)).minus(tokenBalance) >= 0)
            //     ||
            //     (values.token === SUPPORTED_TOKENS.ICZ[0] && 
            //         new BigNumber(values.amount).multipliedBy(Math.pow(10,18)).minus(iczBalance) >= 0)) {

            //         formik.setFieldError('amount', 'Not enough balance');
            //     }

            handleSubmit(values);
        },

        validationSchema: transferSchema,

    });

    return (
        <div className='card half-width'>
            <h3 className='card-header'>Wallet Balance:</h3>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='token'>Token: </label>
                    <select 
                        onChange={formik.handleChange}
                        value={formik.values.token}
                        name='token'
                    >
                        <option value={SUPPORTED_TOKENS.ICZ[0]}>{SUPPORTED_TOKENS.ICZ[0]}</option>
                        <option value={SUPPORTED_TOKENS.MYTOKEN[0]}>{SUPPORTED_TOKENS.MYTOKEN[0]}</option>
                    </select>
                    {formik.errors.token && <span className='error'>{formik.errors.token}</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='to'>Recipient Address: </label>
                    <input 
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.to}
                        name='to'
                    />
                    {formik.errors.to && <span className='error'>{formik.errors.to}</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>Amount: </label>
                    <input 
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        name='amount'
                    />
                    {formik.errors.amount && <span className='error'>{formik.errors.amount}</span>}
                </div>
                <button type='submit'>Transfer</button>
            </form>
        </div>
    );
}