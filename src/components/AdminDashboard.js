import React from 'react';

const AdminDashboard = () => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
        window.location.href = '/user/dashboard'; // Redirect to user dashboard if not admin
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            {/* Admin-related features */}
        </div>
    );
};

export default AdminDashboard;
