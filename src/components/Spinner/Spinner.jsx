import { Oval }  from 'react-loader-spinner';
import React from 'react';
import './Spinner.scss';

export default class Spinner extends React.Component {
  //other logic
  render() {
    return (
      <div className="loader-box">
        <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
      </div>
    );
  }
}
