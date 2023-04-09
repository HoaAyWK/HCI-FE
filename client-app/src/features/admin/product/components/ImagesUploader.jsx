import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

import uploadFile from '../../../../assets/images/upload-file.png';
import { useEffect, useRef, useState } from 'react';
import { Iconify } from '../../../../components';

const StyledUploaderArea = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 250,
  cursor: 'pointer',
  overflow: 'hidden',
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  background: theme.palette.background.neutral,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    opacity: 0.72
  }
}));

const StyledPreviewImage = styled(Box)(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  objectFit: 'cover',
}));

const ImagesUploader = ({ name, ...other }) => {
  const { control } = useFormContext();
  const imageRef = useRef();
  const [files, setFiles]  = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      const imagesArray = files.map((file) => URL.createObjectURL(file));
      setImages(prev => prev.concat(imagesArray));

      return () => imagesArray.map((image) => URL.revokeObjectURL(image));
    }
  }, [files]);

  const handleClick = () => {
    imageRef?.current?.click();
  };

  const handleClickClose = (image) => () => {
    console.log(image);
    URL.revokeObjectURL(image);
    setImages(prev => prev.filter((prevImage) => prevImage !== image));
  };

  const handleMultiFilesChange = (event) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <StyledUploaderArea role='presentation' tabIndex={-1} onClick={handleClick}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input
                style={{ display: 'none' }}
                type='file'
                accept='image/*'
                multiple
                ref={(instance) => {
                  field.ref(instance);
                  imageRef.current = instance;
                }}
                onChange={handleMultiFilesChange}
              />
              <Box
                sx={{
                  width: 188,
                  height: 188,
                  objectFit: 'cover'
                }}
                component='img'
                src={uploadFile}
                alt='file upload'
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  xs: {
                    justifyContent: 'center'
                  },
                  md: {
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Typography variant='h5' compoennt='span'>
                  Select or Drop file
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  Drop files here or click browse through your machine
                </Typography>
              </Box>
            </Box>
          </StyledUploaderArea>
          {images.length > 0 && (
            <>
              <Stack direction='row' sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {images.map((image) => (
                  <Box
                    key={image}
                    sx={{
                      position: 'relative',
                      m: 1
                    }}
                  >
                    <StyledPreviewImage
                      component='img'
                      alt='image'
                      src={image}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                      }}
                      size='small'
                      color='error'
                      onClick={handleClickClose(image)}
                    >
                      <Iconify icon='material-symbols:close-rounded' width={20} height={20} />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2
                }}
              >
                <Button variant='outlined' color='inherit' onClick={() => { setImages([])}}>
                  Remove all
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    />
  );
};

export default ImagesUploader;
