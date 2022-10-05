import tw from "tailwind-styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  FieldValue,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import * as z from "zod";
import { Prisma, Survey } from "@prisma/client";
import { match } from "ts-pattern";
import { Alert } from "flowbite-react";

import { Button, Spinner } from "common/ui";
import { useCreateOneSurveyAnswerMutation } from "features/survey/hook";
import { formSurveys } from "features/survey/schemas";

type FormSurveyProps = {
  survey: Survey;
};
export const FormSurvey = ({ survey }: FormSurveyProps) => {
  const formSurvey = formSurveys.find((form) => survey.type === form.type);
  const { mutation } = useCreateOneSurveyAnswerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSurvey?.validation),
  });

  const onSubmit = async (data: any) => {
    const dataArray = Object.entries(data).reduce(
      (acc: any, [key, value]) => [...acc, { key, value }],
      []
    );
    await mutation.mutateAsync({
      surveyId: survey.id,
      payload: dataArray,
    });
  };

  useEffect(() => {
    if (Boolean(Object.keys(errors).length > 0)) {
      console.log({ errors });
    }
  }, [errors]);

  return (
    <>
      {(mutation.isIdle || mutation.isLoading) && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {formSurvey?.structure?.map((input, index) => (
            <FormInput
              key={input.value}
              register={register}
              errors={errors}
              {...input}
            />
          ))}
          <Button
            disabled={mutation.isLoading}
            type="submit"
            className="ml-auto w-fit"
          >
            Submit
            {mutation.isLoading && <Spinner />}
          </Button>
        </StyledForm>
      )}
      {mutation.isSuccess && (
        <div>
          <p>Thank you for submitting!</p>
        </div>
      )}
    </>
  );
};

const StyledTextField = tw.input<any>`p-2 border border-zinc-200 rounded`;
const StyledTextArea = tw.textarea`p-2 border border-zinc-200 rounded`;
const StyledForm = tw.form<any>`flex flex-col gap-2`;
const StyledFormContainer = tw.div<any>`flex flex-col`;
const StyledFormLabel = tw.label<any>`font-bold`;
const StyledRadioButton = tw.label<any>`
	inline-flex items-center justify-between 
	w-full px-2 py-1 text-zinc-800 bg-white 
	border-2 border-zinc-200 rounded cursor-pointer 
	peer-checked:border-zinc-400 peer-checked:text-zinc-500 
	peer-checked:bg-zinc-200
	hover:text-zinc-600 hover:bg-zinc-100
`;

type FormInputProps = {
  value: string;
  label: string;
  type: "text" | "choice";
  question: string;
  choices?: string[];
  register: any;
  errors?: any;
};

const FormInput = (props: FormInputProps) => {
  const renderInput = match(props.type)
    .with("text", () => (
      <>
        <StyledFormLabel>{props.question}</StyledFormLabel>
        <StyledTextField type="text" {...props.register(props.value)} />
      </>
    ))
    .with("choice", () => (
      <>
        <StyledFormLabel>{props.question}</StyledFormLabel>
        <ul className="flex mt-2 gap-2">
          {props?.choices?.map((choice) => (
            <li key={choice}>
              <input
                id={choice}
                type="radio"
                className="hidden peer"
                value={choice}
                {...props.register(props.value)}
              />
              <StyledRadioButton htmlFor={choice} className="">
                <p className="font-bold">{choice}</p>
              </StyledRadioButton>
            </li>
          ))}
        </ul>
      </>
    ))
    .exhaustive();
  return (
    <StyledFormContainer>
      {renderInput}
      {Boolean(props.errors?.[props.value]) && (
        <Alert color="failure">
          <span>{props.errors[props.value]?.message}</span>
        </Alert>
      )}
    </StyledFormContainer>
  );
};
