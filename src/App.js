import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(repositories => setRepos(repositories.data))
  }, [])

  async function handleAddRepository() {
    try {
      const data = {
        title: 'Conceitos ReactJS',
        url: 'https://github.com/Teuuz1994/desafio03-conceitos-reactjs-gostack',
        techs: ['ReactJS', 'Axios', 'NodeJS', 'Babel', 'Webpack']
      }

      const response = await api.post('repositories', data)
      const newRepo = response.data
      setRepos([...repos, newRepo])
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepos(repos.filter(repos => repos.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>

            <ul>
              <li><a href={repo.url} target="_blank">{repo.title}</a></li>
              <li>{repo.likes}</li>
            </ul>

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
