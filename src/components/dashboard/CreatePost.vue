<script setup lang="ts">
import InputLabel from '../InputLabel.vue'
import InputError from '../InputError.vue'
import IconSpinner from '../icons/IconSpinner.vue'

import { useForm, useField } from 'vee-validate'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import Quill from 'quill'
// import 'quill/dist/quill.core.css'
import { onMounted, ref } from 'vue'
import { createPost, getPostCategories, type ICategory } from '@/api'

const media = ref<File>()

defineProps<{
  showCreatePost: boolean
}>()

defineEmits<{
  (e: 'setshowCreatePost', value: boolean): boolean
}>()

const validationSchema = toTypedSchema(
  zod.object({
    title: zod.string().min(1, { message: 'Post title is required' }).default(''),
    content: zod.string().default(''),
    category: zod.string().min(1, { message: 'Post category is required' }).default(''),
    tags: zod.string().default(''),
    metaTitle: zod.string().default(''),
    metaDescription: zod.string().default(''),
    metaKeywords: zod.string().default('')
  })
)

const { handleSubmit, errors, isSubmitting, resetForm, setValues, setErrors } = useForm({
  validationSchema
})

const { value: title } = useField('title')
const { value: category } = useField('category')
const { value: tags } = useField('tags')
const { value: metaTitle } = useField('metaTitle')
const { value: metaDescription } = useField('metaDescription')
const { value: metaKeywords } = useField('metaKeywords')

const onSubmit = handleSubmit(async (values, ctx) => {
  const content = quill.getContents()

  console.log('content', content)
  console.log('getlen')
  if (quill.getLength() < 2) {
    setErrors({
      content: 'Post content is required'
    })
    return
  }
  ctx.setValues({
    content: JSON.stringify(content)
  })
  console.log('values', values)
  //@ts-ignore
  delete values.content

  const formData = new FormData()

  formData.append('content', JSON.stringify(content))
  for (const key in values) {
    formData.append(key, values[key as keyof typeof values] as string)
  }

  if (media.value) {
    formData.append('media', media.value as unknown as File)
  }

  //api call

  try {
    const data = await createPost(formData)

    console.log('data', data)
  } catch (error) {
    console.log('err', error)
  }
})

const editor = ref<HTMLElement | string>('')
let quill: Quill
let categories: ICategory[]

onMounted(async () => {
  quill = new Quill(editor.value, {
    theme: 'snow',
    // readOnly: true,
    placeholder: 'Type here...',

    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'video'],
        ['code-block', 'blockquote', 'code'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }]
      ]
    }
  })

  categories = await getPostCategories()
})

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files

  const file = files?.[0]

  media.value = file
}

const onEditorChange = (event: Event) => {
  console.log('event', event.target)
}
</script>

<style>
@import 'quill/dist/quill.snow.css';

.ql-editor {
  height: 100px;
}
</style>

<template>
  <section>
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full inset-0 h-screen bg-gray-800/80"
      @click.stop="$emit('setshowCreatePost', false)"
      :class="{ hidden: !showCreatePost }"
    >
      <div
        class="relative rounded-lg w-full max-w-6xl h-[95vh] overflow-y-scroll bg-white"
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
              @click="$emit('setshowCreatePost', false)"
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
          <div class="px-6 py-8 mx-auto lg:py-0">
            <div class="w-full md:mt-0 xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form class="grid grid-cols-5 gap-5" @submit="onSubmit">
                  <div class="col-span-3">
                    <div>
                      <InputLabel for="file" label="Post title" :isError="Boolean(errors.title)" />
                      <input type="file" @change="handleFileUpload($event)" />
                      <InputError
                        :isError="Boolean(errors.title)"
                        :message="errors.title as string"
                      />
                    </div>
                    <div>
                      <InputLabel for="title" label="Post title" :isError="Boolean(errors.title)" />
                      <input
                        type="text"
                        name="title"
                        id="title"
                        v-model="title"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="AI is coming for us all"
                        autofocus
                      />
                    </div>
                    <div>
                      <InputLabel
                        for="content"
                        label="Content"
                        :isError="Boolean(errors.content)"
                      />
                      <div ref="editor" class="h-20 w-full" @change="onEditorChange"></div>
                      <InputError
                        :isError="Boolean(errors.content)"
                        :message="errors.content as string"
                      />
                    </div>
                    <div>
                      <InputLabel
                        for="category"
                        label="Post category"
                        :isError="Boolean(errors.category)"
                      />

                      <select
                        name="category"
                        id="category"
                        v-model="category"
                        placeholder="Select category"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      >
                        <option value="" disabled>Select category</option>
                        <option
                          v-for="category in categories"
                          :key="category._id"
                          :value="category._id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                      <InputError
                        :isError="Boolean(errors.category)"
                        :message="errors.category as string"
                      />
                    </div>
                    <div>
                      <InputLabel for="tags" label="Post tags " :isError="Boolean(errors.tags)" />
                      <input
                        type="text"
                        name="tags"
                        id="tags"
                        v-model="tags"
                        placeholder="ai,science"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      <InputError
                        :isError="Boolean(errors.tags)"
                        :message="errors.tags as string"
                      />
                    </div>
                  </div>

                  <div class="col-span-2">
                    <div>
                      <InputLabel
                        for="meta title"
                        label="Meta title"
                        :isError="Boolean(errors.metaTitle)"
                      />
                      <input
                        type="text"
                        name="title"
                        id="title"
                        v-model="metaTitle"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Meta title"
                        autofocus
                      />
                      <InputError
                        :isError="Boolean(errors.metaTitle)"
                        :message="errors.metaTitle as string"
                      />
                    </div>
                    <div>
                      <InputLabel
                        for="meta-description"
                        label="Meta description"
                        :isError="Boolean(errors.metaDescription)"
                      />
                      <textarea
                        type="text"
                        name="meta-description"
                        id="meta-description"
                        v-model="metaDescription"
                        placeholder="Enter here..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      <InputError
                        :isError="Boolean(errors.metaDescription)"
                        :message="errors.metaDescription as string"
                      />
                    </div>
                    <div>
                      <InputLabel
                        for="keywords"
                        label="Meta keywords"
                        :isError="Boolean(errors.metaKeywords)"
                      />
                      <input
                        type="text"
                        name="keywords"
                        id="keywords"
                        v-model="metaKeywords"
                        placeholder="Enter keywords here..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      <InputError
                        :isError="Boolean(errors.metaKeywords)"
                        :message="errors.metaKeywords as string"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="w-full inline-flex justify-center items-center gap-3 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create Post <IconSpinner v-if="isSubmitting" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
