import { useEffect } from 'react'
import moment from 'moment'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CONSTANTS_STRING from '../../constants/strings'
import InputField from '../Common/InputField'
import { taskFormSchema } from '../../validation-schema/schema'
export default function TaskForm({
  formtTitle,
  onSubmit,
  defaultValues,
  handleCloseModal,
  open,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title || '',
        description: defaultValues.description || '',
        due_date: moment(defaultValues.dueDate).format('YYYY-MM-DD'),
      })
    }
  }, [defaultValues, reset])

  const onFormSubmit = (data) => {
    reset({
      title: '',
      description: '',
      due_date: '',
    })
    onSubmit(data)
  }

  return (
    <Dialog open={open} onClose={handleCloseModal} className="relative z-10">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left w-full"
                    style={{ width: '300px' }}
                  >
                    <DialogTitle
                      as="h2"
                      className="mb-7 text-base font-semibold leading-6 text-gray-900 text-center"
                    >
                      {formtTitle}
                      <hr />
                    </DialogTitle>
                    <div className="flex flex-col space-y-5">
                      <InputField
                        label={CONSTANTS_STRING.TITLE}
                        register={register}
                        errors={errors}
                        data-testid="title"
                        name="title"
                        required
                      />
                      <InputField
                        label={CONSTANTS_STRING.DESCRIPTION}
                        register={register}
                        errors={errors}
                        data-testid="description"
                        name="description"
                        required
                        type="textarea"
                      />
                      <InputField
                        label={CONSTANTS_STRING.DUE_DATE}
                        register={register}
                        errors={errors}
                        data-testis="due_date"
                        name="due_date"
                        required
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  data-testid="submit_task"
                  className="inline-flex w-full justify-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-800 hover:bg-zinc-950 sm:mt-0 sm:w-auto"
                >
                  {formtTitle}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
