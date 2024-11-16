import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
    <div className="col-md-6">
    <div className="card">
    <div className="card-header">
    <h3>Login</h3>
    </div>
    <div className="card-body">
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <input type="text" className="form-control" id="username" value={username}
    onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div className="form-group">
    <input type="text" className="form-control" id="password" value={password}
    onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
    </div>
    </div>
    </div> {message && <p className="text-center mt-3">{message} {username}!</p>}
    </div> );
}

export default App;
