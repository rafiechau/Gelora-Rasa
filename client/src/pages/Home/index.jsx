import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <FormattedMessage id="app_greeting" />
    </div>
  );
};

export default Home;
