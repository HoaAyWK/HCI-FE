import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


import { StyledPaper } from '../components/styles';
import { getCommentsByProduct, refresh, selectAllComments } from './comments/commentSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import ROLES from '../../../constants/userRoles';
import CommentWithReply from './comments/comment';
import CommentForm from './comments/CommentForm';

const CommentSection = ({ productId }) => {
  const dispatch = useDispatch();
  const [showNumber, setShowNumber] = useState(5);
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);

  const comments = useSelector(selectAllComments);
  const { getCommentsByProductStatus, createCommentStatus, totalPage, totalItems } = useSelector((state) => state.comments);

  const canShowMore = useMemo(() => {
    if (showNumber >= totalItems) {
      return false;
    }

    return true;
  }, [showNumber, totalItems]);

  useEffect(() => {
      dispatch(refresh());
      dispatch(getCommentsByProduct({ productId, num: 5, page }));
  }, [productId]);

  useEffect(() => {
    dispatch(getCommentsByProduct({ productId, num: 5, page }));
  }, [page]);

  useEffect(() => {
    if (createCommentStatus === ACTION_STATUS.SUCCEEDED) {
      setPage(1)
      dispatch(getCommentsByProduct({ productId, num: 5, page: 1 }));
      dispatch(refresh());
    }
  }, [createCommentStatus]);

  const handleShowMore = () => {
    setShowNumber(prev => prev + 5);
    setPage(prev => prev + 1);
  };

  if (getCommentsByProductStatus === ACTION_STATUS.IDLE ||
      getCommentsByProductStatus === ACTION_STATUS.LOADING) {

    return (
      <Box sx={{ py: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (getCommentsByProductStatus === ACTION_STATUS.FAILED) {
    return <></>;
  }

  return (
    <Box
        sx={{ width: '100%', my: 4 }}
      >
        <StyledPaper sx={{ p: 2 }}>
          <Box
            sx={{
              mb: 2
            }}
          >
            <Typography variant='h5' component='h1'>
              Comments
            </Typography>
          </Box>
          {user && (
            <Stack spacing={2} direction='row'>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alginItems: 'center',
                }}
              >
                <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
              </Box>
              <CommentForm userId={user.id} productId={productId} />
            </Stack>
          )}
          <Box sx={{ px: 2, pb: 2 }}>
            {comments.length === 0 ? (
              !user && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 2,
                  }}
                >
                  This product does not have any comments
                </Box>
              )
            ) : (
              <Stack spacing={2}>
                {comments.map((comment) => (
                  <CommentWithReply currentUser={user} key={comment.id} comment={comment} />
                ))}
              </Stack>
            )}
            {canShowMore && (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  my: 1
                }}
              >
                <Button onClick={handleShowMore}>
                  Show more
                </Button>
              </Box>
            )}
          </Box>
        </StyledPaper>
    </Box>
  );
};

export default CommentSection;
