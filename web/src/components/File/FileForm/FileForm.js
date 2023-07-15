import { useEffect, useState } from 'react'

import { PickerInline } from 'filestack-react'

import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

export const QUERY = gql`
  query FindFiles {
    files {
      id
      title
      url
    }
  }
`

const FileForm = (props) => {
  const { data } = useQuery(QUERY)
  const [url, setUrl] = useState(props?.file?.url)
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (data) {
      setFiles(data.files)
    }
  }, [data])

  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { url })
    const existingFile = files.find((file) => file.title === dataWithUrl.title)
    if (existingFile) {
      alert(`File with name ${dataWithUrl.title} already exists.`)
      return
    }

    props.onSave(dataWithUrl, props?.file?.id)
  }

  const onFileUpload = (response) => {
    setUrl(response.filesUploaded[0].url)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.file?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          onSuccess={onFileUpload}
        >
          <div
            style={{ display: url ? 'none' : 'block', height: '500px' }}
          ></div>
        </PickerInline>

        {url && (
          <div>
            <img
              src={url}
              style={{ display: 'block', margin: '2rem 0', height: '150px' }}
              alt="urlfile"
            />
            <button
              onClick={() => setUrl(null)}
              className="rw-button rw-button-blue"
            >
              Replace File
            </button>
          </div>
        )}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FileForm
