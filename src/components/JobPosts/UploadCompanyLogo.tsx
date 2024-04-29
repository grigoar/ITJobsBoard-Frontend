import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from '../common/Button/Button';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface Props {
  companyLogoImagePath: string;
  newImageUpdateTime: number;
  setErrorMessage?: (_message: string) => void;
  changeImagePreview: (_file: File | null) => void;
  imgMultipartPreview: File | null;
}

const UploadCompanyLogo = ({
  newImageUpdateTime,
  companyLogoImagePath,
  changeImagePreview,
  imgMultipartPreview,
}: Props) => {
  const [imgData, setImgData] = useState<string>(companyLogoImagePath);
  const [photoUpdatedTime, setPhotoUpdatedTime] = useState<any>(newImageUpdateTime);
  const hiddenInputUploadPhotoButton = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImgData(companyLogoImagePath);
    setPhotoUpdatedTime(newImageUpdateTime);
  }, [companyLogoImagePath, newImageUpdateTime]);

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file?.type.match(imageMimeType) == null) {
      return;
    }
    if (file) {
      changeImagePreview(file);
    }
  };

  const deleteUploadImagePreviewHandler = () => {
    changeImagePreview(null);
  };

  const uploadImageExtraHandler = () => {
    hiddenInputUploadPhotoButton.current?.click();
  };

  const imagePath = '/images/utils/uploadPhoto.jpeg';

  const photoImageAmzLink = `${process.env.NEXT_PUBLIC_AWS_STORAGE_PATH_URL}/${imgData}?${photoUpdatedTime}`;
  const imageSrcUserPhoto = imgData ? photoImageAmzLink : imagePath;
  const imageSrcPreview = imgMultipartPreview ? URL.createObjectURL(imgMultipartPreview) : imagePath;

  return (
    <div className={'classes.uploadPictureContainer mb-4 flex w-full flex-col justify-center pr-8'}>
      <div className={'classes.imageHolder flex flex-col items-start justify-center'}>
        <h4 className={'classes.uploadPictureTitle'}>Exiting Logo</h4>
        <Image
          className={'classes.avatarImage'}
          src={imageSrcUserPhoto}
          alt={'No user profile photo'}
          width={200}
          height={200}
          unoptimized={true}
        />
        <Image
          className={'h-[100px] w-[100px] rounded-[100%]  bg-slate-50'}
          src={imageSrcUserPhoto}
          alt={'No Company profile photo'}
          width={100}
          height={100}
          unoptimized={true}
        />
        <div className={'classes.updateAvatarImageContainer relative flex flex-col items-center justify-center'}>
          <h4 className={'classes.uploadPictureChangeTitle mb-2 mt-4 text-center'}>Company Logo</h4>
          <div className={'classes.uploadPicturePreviewWrapper relative'}>
            <div
              className={
                'classes.imagePreviewContainer relative mb-2 h-[100px] w-fit cursor-pointer overflow-hidden rounded-[50%]'
              }
            >
              <Image
                className={'classes.imagePreview '}
                src={imageSrcPreview}
                alt={'No user profile photo'}
                width={100}
                height={100}
                unoptimized={true}
              />

              <input
                className={
                  'classes.btnBrowsePicture absolute right-0 top-0 h-full w-full cursor-pointer pl-24 opacity-0'
                }
                type="file"
                name="profileImage"
                onChange={changeImageHandler}
              ></input>
            </div>

            <Button
              action={deleteUploadImagePreviewHandler}
              style={`simpleBtnLikeLink ${'classes.mobileNavBtn absolute top-0 right-0 text-[var(--color-red-light)] cursor-pointer'}`}
            >
              <AiOutlineCloseCircle className={'classes.deleteImageCircleIcon'} />
            </Button>
          </div>
        </div>
      </div>
      <div className={'classes.btnUploadContainer flex w-full justify-start'}>
        <>
          <Button
            style={`border-2 rounded-xl  ${'classes.btnUploadButton  w-[150px]'}`}
            action={uploadImageExtraHandler}
          >
            Upload Logo
          </Button>
          <input
            className={`btn btn-ghost ${'classes.btnUploadButton'}`}
            type="file"
            name="profileImage"
            ref={hiddenInputUploadPhotoButton}
            style={{ display: 'none' }}
            onChange={changeImageHandler}
          ></input>
        </>
      </div>
    </div>
  );
};

export default React.memo(UploadCompanyLogo);
