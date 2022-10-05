import clsx from "clsx";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";

import { Button, Spinner } from "common/ui";
import { getBaseUrl } from "common/utils";
import { useCreateOneSurveyMutation } from "features/survey/hook";
import { formSurveys } from "features/survey/schemas";

export function ButtonModalCreateSurvey() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(formSurveys[0]);
  const { data } = useSession();

  const { mutation } = useCreateOneSurveyMutation();

  const handleSurveyCreation = async () => {
    console.log({ mutation });
    await mutation.mutate({
      email: data?.user?.email ?? "",
      name: `${selectedSurvey.name} - ${new Date().toLocaleDateString()}`,
      type: selectedSurvey.type,
      structure: selectedSurvey.structure
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen && (mutation.isSuccess || mutation.isError)) {
      mutation.reset();
      setSelectedSurvey(formSurveys[0]);
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center justify-center">
        <Button onClick={openModal}>Add Survey</Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle bg-white shadow-xl transform rounded-2xl transition-all">
                  {(mutation.isIdle || mutation.isLoading) && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-bold text-gray-900 leading-6"
                      >
                        Create a new Survey
                      </Dialog.Title>
                      <div className="mt-4 mb-8 grid grid-cols-2 gap-2">
                        {formSurveys.map((survey) => (
                          <Button
                            className={clsx(
                              selectedSurvey.type === survey.type &&
                                "bg-zinc-200"
                            )}
                            key={survey}
                            onClick={() => setSelectedSurvey(survey)}
                          >
                            {survey.name}
                            {selectedSurvey.type === survey.type && (
                              <CheckIcon className="w-4 h-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Button onClick={() => closeModal()}>Cancel</Button>
                        <Button
                          onClick={() => handleSurveyCreation()}
                          className="bg-zinc-200 hover:bg-zinc-300"
                        >
                          Create Survey
                          {mutation.isLoading && <Spinner />}
                        </Button>
                      </div>
                    </>
                  )}
                  {mutation.isSuccess && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="flex justify-between text-lg font-bold text-gray-900 leading-6"
                      >
                        Create a new Survey
                        <div className="flex items-center justify-between p-2 bg-green-200 rounded gap-4">
                          <p className="text-xs font-bold">Survey Created</p>
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      </Dialog.Title>
                      <div className="flex flex-col mt-4">
                        <p className="mb-2 font-bold">Survey link</p>
                        <div className="p-2 border rounded-lg border-zinc-200">
                          <a
                            className="break-all"
                            target="_blank"
                            href={`${getBaseUrl()}/survey/${
                              mutation?.data?.id
                            }`}
                          >{`${getBaseUrl()}/survey/${mutation?.data?.id}`}</a>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-4">
                        <Button
                          className="bg-zinc-200"
                          onClick={() => closeModal()}
                        >
                          Close Modal
                        </Button>
                      </div>
                    </>
                  )}
                  {mutation.isError && (
                    <div>
                      <p>Something went wrong</p>
                      <p>{mutation.error.message}</p>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
