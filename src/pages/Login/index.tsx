import React, { useState, useEffect, useRef } from 'react';
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import illustrationUrl from "../../assets/images/illustration.png";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import clsx from "clsx";
import { useAuth } from '../../contexts/Auth';
import * as ApiService from "../../services/auth";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";

const Login = () => {
  const auth = useAuth();
  const [loading, isLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");

  // Success notification
  const notify = useRef<Notification>();
  const schema = yup
    .object({
      email: yup.string().required().email(),
      password: yup.string().required().min(4)
    }).required();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (result) {
      isLoading(true);
      try {
        const data = await getValues();
        let res = await ApiService.login(data);
        isLoading(false);
        await auth.signIn(res.user);
        setSuccess(true);
        setMessage("Authenticated successfully");
        notify.current?.showToast();
      } catch (error) {
        isLoading(false);
        setSuccess(false);
        setMessage("Incorrect credetials.");
        notify.current?.showToast();
      }
    }

  };

  return (
    <>
      <div
        className={clsx([
          "-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <DarkModeSwitcher />
        <MainColorSwitcher />
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <div className="my-auto">
                <img
                  alt=""
                  className="w-1/3 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  1 Declaration 55 Countries<br /> 3 Days
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Driving green growth & climate finance solutions <br />For Africa And The World
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Sign In
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  A few more clicks to sign in to your account.
                </div>
                <form className="validate-form" onSubmit={onSubmit}>
                  <div className="mt-8 intro-x">
                    <div className="input-form">
                      <FormInput
                        {...register("email")}
                        id="validation-form-2"
                        type="email"
                        name="email"
                        className={errors.email ? "block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px] border-danger" : 'block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]'}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <div className="mt-2 text-danger">
                          {typeof errors.email.message === "string" &&
                            errors.email.message}
                        </div>
                      )}
                    </div>
                    <div className="input-form">
                      <FormInput
                        {...register("password")}
                        id="validation-form-3"
                        type="password"
                        name="password"
                        className={errors.password ? "block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px] border-danger" : 'block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]'}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <div className="mt-2 text-danger">
                          {typeof errors.password.message === "string" &&
                            errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="">Forgot Password?</a>
                  </div>
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
      {/* BEGIN: Success Notification Content */}
      <Notification getRef={(el) => { notify.current = el; }}
        options={{
          duration: 3000,
        }}
        className="flex"
      >
        <Lucide icon={success ? "CheckCircle" : "XCircle"} className={success ? "text-success" : "text-danger"} />
        <div className="ml-4 mr-4">
          <div className="font-medium">{success ? "Success" : "Failed"}</div>
          <div className="mt-1 text-slate-500">
            {message}
          </div>
        </div>
      </Notification>
    </>
  );
}

export default Login;
