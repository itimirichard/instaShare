import React, { Fragment, useState } from 'react';
import Message from '../components/Message';
import Progress from '../components/Progress';
import useRequest from '../hooks/use-request';

const Upload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/files/upload',
    method: 'post',
    onSuccess: (data) => {
      const { fileName, filePath } = data;
      setUploadedFile({ fileName, filePath });
      setMessage('File Successfully Uploaded');
    },
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    await doRequest(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 5000);
      },
    });
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      {errors}
      <form onSubmit={onSubmit} className='mt-4'>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label'>{filename}</label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
          disabled={filename && filename === 'Choose File'}
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Upload;
