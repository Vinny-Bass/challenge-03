import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status == 204) {
      const updated_repositories = repositories.filter(repositorie => {
        return repositorie.id !== id;
      });
      setRepositories(updated_repositories);
    } else if (response.status == 400) {
      return response.error;
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => 
          <li key={r.id}>
            {r.title}

            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
