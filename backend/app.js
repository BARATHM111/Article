import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleTable from './components/ArticleTable';
import UserTable from './components/UserTable';
import LikesTable from './components/LikesTable';
import ViewsTable from './components/ViewsTable';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><a href="/">Articles</a></li>
                        <li><a href="/users">Users</a></li>
                        <li><a href="/likes">Likes</a></li>
                        <li><a href="/views">Views</a></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<ArticleTable />} />
                    <Route path="/users" element={<UserTable />} />
                    <Route path="/likes" element={<LikesTable />} />
                    <Route path="/views" element={<ViewsTable />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
