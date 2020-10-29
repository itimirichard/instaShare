import { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const useRequest = ({ url, method, body = {}, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (additionalBody = {}, additionalOptions = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](
        url,
        {
          ...body,
          ...additionalBody,
        },
        { ...additionalOptions }
      );

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      debugger;
      setErrors(
        <div>
          {err.response &&
            err.response.data.errors.map((err) => (
              <p key={err.msg}>
                <Message msg={err.msg} />
              </p>
            ))}
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
