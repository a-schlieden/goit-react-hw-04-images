// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Notification } from 'components/Notification/Notification';
// import imgFetch from './/../api/api';
import imgFetch from '../api/api';

export default function App() {
  const [pageNumber, setpageNumber] = useState(1);
  const [formInput, setFormInput] = useState('');
  const [largeImg, setLargeImg] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idleNothing');

  useEffect(() => {
    if (!formInput) {
      return;
    }

    setStatus('pendingLoad');

    imgFetch
      .fetchImages(formInput, pageNumber)
      .then(imagesFromBack => {
        if (imagesFromBack.hits.length > 0) {
          setImages([...images, ...imagesFromBack.hits]);
          setStatus('resolved');
        } else {
          return setStatus('noImg');
        }
      })
      .catch(errorFetch => {
        setError(errorFetch);
        setStatus('rejecktedError');
      });
  }, [formInput, pageNumber]);

  const onFormSubmit = formData => {
    setFormInput(formData);
    setpageNumber(1);
    setImages([]);
  };

  const onLoadmoreBtnClick = () => {
    setpageNumber(prevState => prevState + 1);
  };

  const closeModal = bigImg => {
    setLargeImg(bigImg);
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Searchbar onSubmitForm={onFormSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} onImgClick={closeModal} />
      )}

      {status === 'resolved' && <Button onBtnClick={onLoadmoreBtnClick} />}

      {status === 'noImg' && (
        <Notification message={`Sorry no img with name " ${formInput} "`} />
      )}

      {status === 'pendingLoad' && <Loader />}

      {status === 'rejecktedError' && <h2>{error.message}</h2>}

      {largeImg && <Modal closeModal={closeModal} image={largeImg}></Modal>}
    </div>
  );
}
