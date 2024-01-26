import { Toaster } from 'react-hot-toast';
import { colors } from '../styles/styles.js';

function ToasterEl() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 2000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '8px 16px',
          background: colors.brandGray[50],
          color: colors.brand[800],
        },
      }}
    />
  );
}

export default ToasterEl;
