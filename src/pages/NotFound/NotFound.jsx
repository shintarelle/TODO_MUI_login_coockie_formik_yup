import React from 'react';
import BaseTemplate from '../../templates/BaseTemplate';
import CastomHeading from '../../components/CastomHeading';
import { Container, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routeNames from '../../router/routeNames';

function NotFound() {
  const navigate = useNavigate();
  return (
    <BaseTemplate className={'create-item-page'}>
      <Container maxWidth="xs">
        <CastomHeading title={'Not Found Page'} />
        <Box
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: '#007974', borderColor: '#007974' }}
            onClick={() => navigate(routeNames.home)}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    </BaseTemplate>
  );
}

export default NotFound;
