import { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';
import config from './config';

function ExchangeTokenPage() {
  const [searchParams] = useSearchParams();
  const searchParamsRef = useRef(searchParams);
  const [data, setData] = useState(null);

  useEffect(() => {
    const tokenData = new FormData();
    tokenData.append('client_id', config.strava.clientId);
    // this param should be appended by proxy
    tokenData.append('client_secret', config.strava.clientSecret);
    tokenData.append('code', searchParamsRef.current.get('code') ?? '');
    tokenData.append('grant_type', 'authorization_code');
    const tokenUrl = `/oauth/token`;

    fetch(tokenUrl, { method: 'POST', body: tokenData })
      .then(response => response.json())
      .then(setData);
  }, []);

  return (
    <>
      <div>error: {searchParams.get('error')}</div>
      <div>state: {searchParams.get('state')}</div>
      <div>code: {searchParams.get('code')}</div>
      <div>scope: {searchParams.get('scope')}</div>
      <div>data: {JSON.stringify(data)}</div>
    </>
  );
}

function App() {
  const authParams = new URLSearchParams({
    client_id: config.strava.clientId,
    response_type: 'code',
    redirect_uri: 'http://localhost:3000/exchange_token',
    scope: config.strava.validScopes.join(','),
  });
  const authUrl = new URL(config.strava.authUrl);
  authUrl.search = authParams.toString();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<a href={authUrl.href}>Strava login</a>}
        ></Route>
        <Route path="/exchange_token" element={<ExchangeTokenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
