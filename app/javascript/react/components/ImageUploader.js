import React from 'react'
import Dropzone from 'react-dropzone'

const ImageUploader = props => {
  const onDrop = (image) => {
    let submittedImage = new FormData()
    submittedImage.append("image-media", image[0])

    fetch("/api/v1/tweets/add_image.json", {
      credentials: 'same-origin',
      method: "POST",
      body: submittedImage
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div>
      <label>Add Image for Tweet</label>
        <Dropzone
          className="image-uploads"
          multiple={false}
          onDrop={file => onDrop(file)}
        >
          {({getRootProps, getInputProps}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click to upload image / Drop your image here</p>
              </div>
          )}
        </Dropzone>
    </div>
  )
}

export default ImageUploader
