import { useEffect, useState } from 'react';

import { client } from 'index';

function App() {
  const [responseValue, setResponseValue] = useState<
    string | { name: string | null; id: number; email: string }
  >();

  useEffect(() => {
    (async function () {
      try {
        const result = await client.getUsers.query();
        setResponseValue(result[0]);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    })();
  });

  return (
    <div className='App'>
      <h1>React App</h1>
      <div>Test query: {JSON.stringify(responseValue)}</div>
    </div>
  );
}

export default App;
