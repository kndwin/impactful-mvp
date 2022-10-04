import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Button } from "common/ui";
import { useAllSurveyQuery } from "../hook";
import { useSurveyStore } from "../store";

export function SelectSurveyTable() {
  const selected = useSurveyStore((s) => s.selectedSurvey);
  const setSelected = useSurveyStore((s) => s.setSelectedSurvey);
  const { query } = useAllSurveyQuery();

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-auto mt-1">
        <Listbox.Button as={Fragment}>
          <Button className="relative pl-4 pr-1 min-w-[16em] justify-between">
            <span className="block truncate">
              {Boolean(selected) ? selected?.name : "No Survey Created"}
            </span>
            <ChevronUpDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </Button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {query.data?.length === 0 && (
              <div className="p-2">
                <p className="font-bold text-zinc-800">No Survey Created</p>
              </div>
            )}
            {query.data?.map((survey, index) => (
              <Listbox.Option
                key={survey.id}
                defaultChecked={survey.name === selected?.name}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-zinc-100 text-zinc-900" : "text-zinc-900"
                  }`
                }
                value={survey}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {survey.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
