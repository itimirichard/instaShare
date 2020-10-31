import React, { useState, useEffect, Fragment } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import Message from '../components/Message';

const ShowFiles = () => {
  const [filesList, setFilesList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('/api/files/getAllFiles');
        setFilesList(data);
      } catch (err) {
        setMessage(
          <div>
            {err.response && (
              <Message
                msg='Error while downloading file. Try again'
                type='danger'
              />
            )}
          </div>
        );
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/api/files/download/${id}`, {
        responseType: 'blob',
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      console.log(result);
      console.log(split);
      console.log(filename);
      return download(result.data, filename, mimetype);
    } catch (err) {
      setMessage(
        err.response && err.response.data && (
          <Message
            msg='Error while downloading file. Try again'
            type='danger'
          />
        )
      );
    }
  };

  return (
    <Fragment>
      {message}
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Filename</th>
            <th scope='col'>Status</th>
            <th scope='col'>Size</th>
            <th scope='col'>Download Link</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, name, status, size, file_mimetype, file_path }) => (
                <tr key={_id}>
                  <th scope='row'>{name}</th>
                  <td>{status}</td>
                  <td>
                    {status === 'PROCESSED'
                      ? `${(size / 1000000).toFixed(2)} MB`
                      : ''}
                  </td>
                  <td>
                    {status === 'PROCESSED' ? (
                      <a
                        href='#/'
                        onClick={() =>
                          downloadFile(_id, file_path, file_mimetype)
                        }
                      >
                        Download
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={4} style={{ fontWeight: '300' }}>
                No files found. Please upload some.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ShowFiles;
