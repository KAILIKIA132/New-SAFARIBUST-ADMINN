import React, { useState, useRef } from 'react';
import { FormInput } from '../../base-components/Form';
import Button from '../../base-components/Button';
import { useAuth } from '../../contexts/Auth';
import * as ApiService from '../../services/auth';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Notification, { NotificationElement } from '../../base-components/Notification';
import Lucide from '../../base-components/Lucide';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIcon from '../../base-components/LoadingIcon';
import { Errors } from '../../type';

const ForgotPasswordOTP = () => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');

  // Success notification
  const notify = useRef<NotificationElement>();
  const schema = yup.object({
    otp: yup
      .string()
      .required('OTP is required')
      .matches(/^\d{4}$/, 'Enter a valid 4-digit OTP'),
  });

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (result) {
      isLoading(true);
      try {
        const data = await getValues();
        // let res = await ApiService.verifyOTP(data);
        isLoading(false);
        setSuccess(true);
        // setMessage(res.message);
        notify.current?.showToast();
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1000);
      } catch (err: any) {
        isLoading(false);
        setSuccess(false);
        setMessage('Incorrect or invalid OTP');
        notify.current?.showToast();
      }
    }
  };

  return (
    <>
      <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">Verification</h2>
        <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">Enter the 4-digit OTP sent to your email.</div>
        <form className="validate-form" onSubmit={onSubmit}>
          <div className="mt-8 intro-x">
            <div className="input-form flex items-center justify-center space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <FormInput
                  key={index}
                  {...register(`otp[${index}]`)}
                  id={`validation-form-otp-${index}`}
                  type="text"
                  name={`otp[${index}]`}
                  maxLength={1}
                  className={`text-center w-12 h-12 border rounded-md ${
                    errors.otp? 'border-danger' : ''
                    // errors.otp && errors.otp[index] ? 'border-danger' : ''

                  }`
                
                
                
                }
                  placeholder=""
                />
              ))}
            </div>
            {errors.otp && (
              <div className="mt-2 text-danger">{typeof errors.otp.message === 'string' && errors.otp.message}</div>
            )}
          </div>
          <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
            {/* <Button
              type="submit"
              variant="primary"
              className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
            >
              Verify
              {loading && <LoadingIcon icon="spinning-circles" color="white" className="w-4 h-4 ml-2" />}
            </Button> */}
            
            <Link to="/CreateNewPassword">
              <Button variant="outline-primary" className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3">
                Verify
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-primary" className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3">
                Resend Code
              </Button>
            </Link>
          </div>
        </form>
      </div>
      <Notification
        getRef={(el) => {
          notify.current = el;
        }}
        options={{
          duration: 3000,
        }}
        className="flex"
      >
        <Lucide icon={success ? 'CheckCircle' : 'XCircle'} className={success ? 'text-success' : 'text-danger'} />
        <div className="ml-4 mr-4">
          <div className={`font-medium ${success ? 'text-success' : 'text-danger'}`}>
            {success ? 'Success' : 'Failed'}
          </div>
          <div className="mt-1 text-slate-500">{message}</div>
        </div>
      </Notification>
    </>
  );
};

export default ForgotPasswordOTP;
