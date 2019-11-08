import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Redirect } from 'react-router-dom'

const UserTweetForm = props => {
  const [uploadedImage, setUploadedImage] = useState([])
  const [tweetMessage, setTweetMessage] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const onDrop = (image) => {
    setUploadedImage(image)
  }

  const handleChange = event => {
    setTweetMessage(event.currentTarget.value)
  }

  const handleSubmission = event => {
    event.preventDefault()
    let submittedFields = new FormData()
    submittedFields.append("message", tweetMessage)
    submittedFields.append("image", uploadedImage[0])

    fetch("/api/v1/tweets.json", {
      credentials: "same-origin",
      method: 'POST',
      body: submittedFields
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
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to={`/workouts/${props.match.params.id}`} />
  }

  return (
    <div className="page tweet-page">
      <h2 className="page-title">Tweet</h2>
      <form className="grid-x grid-margin-x" onSubmit={handleSubmission}>
        <div className="cell small-12 medium-6 text-center">
          <label>Add Image for Tweet (max 5 MB)</label>
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
          <aside>
            <ul>
              {
                uploadedImage.map(file => <li key={file.name}>{file.name} - {(file.size/1048576).toFixed(2)} MB</li>)
              }
            </ul>
          </aside>
        </div>
        <div className="cell small-12 medium-6 text-center">
          <label>Tweet Message</label>
          <input
            type="text"
            value={tweetMessage}
            onChange={handleChange}
          />
        </div>
        <button className="twitter-button" type="submit">
          <h5 className="twitter-link">Post Tweet</h5>
          <i className="fab fa-twitter"></i>
        </button>
      </form>
    </div>
  )
}

export default UserTweetForm
