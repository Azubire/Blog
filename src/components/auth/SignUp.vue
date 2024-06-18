<script setup lang="ts">
import InputLabel from '../InputLabel.vue'
import InputError from '../InputError.vue'
import IconSpinner from '../icons/IconSpinner.vue'

import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { signUp } from '@/api'
import { toast } from 'vue3-toastify'

defineProps<{
  showSignup: boolean
}>()

const emitt = defineEmits<{
  (e: 'setShowSignup', value: boolean): boolean
  (e: 'setShowSignin', value: boolean): boolean
}>()

const validationSchema = toTypedSchema(
  zod
    .object({
      userName: zod.string().min(1, 'username is required').default(''),
      email: zod
        .string()
        .min(1, { message: 'Email is required' })
        .email('Must be a valid email')
        .default(''),
      password: zod
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[\W_]/, 'Password must contain at least one special character')
        .default(''),
      confirmPassword: zod.string().min(8, 'Confirm password is required').default('')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })
)

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema
})

const { value: email } = useField('email')
const { value: username } = useField('userName')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  console.log('values', values)

  //api call
  try {
    await signUp(values)

    emitt('setShowSignup', false)
    toast.success('Account created successfully')
    resetForm()
  } catch (error) {
    console.log('err', error)
  }
})
</script>

<template>
  <section>
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full inset-0 h-screen bg-gray-800/80"
      @click.stop="$emit('setShowSignup', false)"
      :class="{ hidden: !showSignup }"
    >
      <div
        class="relative rounded-lg w-full max-w-2xl h-[95vh] overflow-y-scroll bg-white"
        @click.stop
      >
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
          <!-- Modal header -->
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="defaultModal"
              @click="$emit('setShowSignup', false)"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
              <img class="w-48 mr-2" src="@/assets/logo_new.svg" alt="logo" />
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
                >
                  Create an account
                </h1>
                <form class="space-y-4 md:space-y-6" @submit="onSubmit">
                  <div>
                    <InputLabel
                      for="username"
                      label="Your username"
                      :isError="Boolean(errors.userName)"
                    />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      v-model="username"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="johndoe"
                      autocomplete="off"
                      autofocus
                    />
                    <InputError
                      :isError="Boolean(errors.userName)"
                      :message="errors.userName as string"
                    />
                  </div>
                  <div>
                    <InputLabel for="email" label="Your email" :isError="Boolean(errors.email)" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      v-model="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@example.com"
                    />
                    <InputError
                      :isError="Boolean(errors.email)"
                      :message="errors.email as string"
                    />
                  </div>
                  <div>
                    <InputLabel
                      for="password"
                      label="Your password"
                      :isError="Boolean(errors.password)"
                    />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      v-model="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    <InputError
                      :isError="Boolean(errors.password)"
                      :message="errors.password as string"
                    />
                  </div>
                  <div>
                    <InputLabel
                      for="confirm-password"
                      label="Confirm password"
                      :isError="Boolean(errors.confirmPassword)"
                    />
                    <input
                      type="confirm-password"
                      name="confirm-password"
                      id="confirm-password"
                      v-model="confirmPassword"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    <InputError
                      :isError="Boolean(errors.confirmPassword)"
                      :message="errors.confirmPassword as string"
                    />
                  </div>

                  <button
                    type="submit"
                    class="w-full inline-flex justify-center items-center gap-3 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account <IconSpinner v-if="isSubmitting" />
                  </button>
                  <p class="text-sm font-light text-gray-500">
                    Already have an account?
                    <a
                      href="#"
                      @click.prevent="$emit('setShowSignin', true)"
                      class="font-medium text-cyan-600 hover:underline"
                      >Login here</a
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
