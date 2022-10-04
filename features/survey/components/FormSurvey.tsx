import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateOneSurveyAnswerMutation } from "features/survey/hook";
import { Button, Spinner } from "common/ui";
import * as z from "zod";

const formOneSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const FormTypeOne = () => {
  const router = useRouter();
  // TODO(knd): not explicit that id is surveyId
  const surveyId = router.query?.id as string;
  const { mutation } = useCreateOneSurveyAnswerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formOneSchema),
  });

  const onSubmit = async (data: any) => {
    await mutation.mutateAsync({
      surveyId,
      payload: data,
    });
  };

  return (
    <>
      {(mutation.isIdle || mutation.isLoading) && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            placeholder="Name"
            type="text"
            {...register("name")}
          />
          <StyledTextArea
            placeholder="Description"
            {...register("description")}
          />
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

const StyledTextField = tw.input`p-2 border border-zinc-200 rounded`;
const StyledTextArea = tw.textarea`p-2 border border-zinc-200 rounded`;
const StyledForm = tw.form<any>`flex flex-col gap-2`;
